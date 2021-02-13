import React from "react";
import MUIDataTable from "mui-datatables";
import * as productgroupRedux from "../_redux/productRedux";
import * as productgroupAxios from "../_redux/productAxios";
import Grid from "@material-ui/core/Grid";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import * as swal from "../../Common/components/SweetAlert";
import Search from "../components/ProductGroupeSearch";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductGroupTable(props) {
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      name: "",
      isActive: "",
    },
  });

  const handleDelete = (objPayload) => {
    productgroupAxios
      .editProductGroup(objPayload)
      .then((res) => {
        debugger;
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Cancel Completed", `Cancel id: ${res.data.data.id}`)
            .then(() => {
              loadData();
            });
        } else {
          //internal error
          // alert(res.data.message)
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        //  loadData();
      });
  };

  const handleEdit = (id) => {
    const history = props.history;
    props.history.push(`/productgroup/edit/${id}`);
  };

  const handleSearch = (values) => {
    if (values.isActive == "0") {
      values.isActive = "";
    }
    setPaginated({
      ...paginated,
      page: 1,
      searchValues: values,
    });
  };

  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const productgroupReducer = useSelector(({ productgroup }) => productgroup);

  React.useEffect(() => {
    //load data from api
    handleSearch.bind(this);
    loadData();
  }, [paginated]);

  const columns = [
    {
      name: "name",
      label: "ProductGroupName",
    },
    {
      label: "สถานะ",
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          let confirmMessage = data[dataIndex].isActive ? "ใช้งาน" : "ยกเลิก";
          return <Grid>{confirmMessage}</Grid>;
        },
      },
    },
    {
      name: "CreatedDate",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {dayjs(data[dataIndex].dateOfBirth).format("DD/MM/YYYY")}
            </Grid>
          );
        },
      },
    },
    "user.id",
    "user.username",
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <EditButton
                style={{ marginRight: 5 }}
                onClick={() => {
                  handleEdit(data[dataIndex].id);
                }}
              >
                Edit
              </EditButton>
              <DeleteButton
                onClick={() => {
                  if (data[dataIndex].isActive != false) {
                    swal
                      .swalConfirm("Confirm save?", "Confirm Cancel")
                      .then((result) => {
                        if (result.isConfirmed) {
                          //prepare objPayload for post api
                          // clone object
                          let objPayload = {
                            ...productgroupReducer.currentProductGroupToAdd,
                            name: data[dataIndex].name,
                            id: data[dataIndex].id,
                            isActive: false,
                          };

                          handleDelete(objPayload);
                        }
                      });
                  } else {
                    swal.swalError("Error", "ยกเลิกอยู่แล้ว");
                  }
                }}
              >
                CANCEL
              </DeleteButton>
            </Grid>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: "none",
    serverSide: true,
    count: totalRecords,
    page: paginated.page - 1,
    rowsPerPage: paginated.recordsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setPaginated({ ...paginated, page: tableState.page + 1 });
          break;
        case "sort":
          setPaginated({
            ...paginated,
            orderingField: `${tableState.sortOrder.name}`,
            ascendingOrder:
              tableState.sortOrder.direction === "asc" ? true : false,
          });
          break;
        case "changeRowsPerPage":
          setPaginated({
            ...paginated,
            recordsPerPage: tableState.rowsPerPage,
          });
          break;
        default:
        //  console.log(`action not handled. [${action}]`);
      }
    },
  };

  const loadData = () => {
    setIsLoading(true);
    debugger;
    productgroupAxios
      .getProductGroupFilter(
        paginated.orderingField,
        paginated.ascendingOrder,
        paginated.page,
        paginated.recordsPerPage,
        paginated.searchValues.name,
        paginated.searchValues.isActive.toString()
      )
      .then((res) => {
        if (res.data.isSuccess) {
          //flatten data
          debugger;
          if (res.data.totalAmountRecords > 0) {
            let flatData = [];
            res.data.data.forEach((element) => {
              flatData.push(flatten(element));
            });
            setData(flatData);
          }
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {/* search */}
      <Search history={props.history} submit={handleSearch.bind(this)}></Search>

      <MUIDataTable
        title={
          <Typography variant="h6">
            ProductGroupList
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />

      {/* {JSON.stringify(data)} */}
    </div>
  );
}

export default ProductGroupTable;
