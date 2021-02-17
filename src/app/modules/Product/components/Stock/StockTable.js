import * as React from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as stockAxios from "../../_redux/productAxios";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function StockTable(props) {
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });
  const stockReducer = useSelector(({ stock }) => stock);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  const columns = [
    {
      name: "id",
      label: "id",
    },
    "product.productGroup.name",
    "product.name",
    "product.price",
    "add",
    "del",
    "stock",

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
  ];

  React.useEffect(() => {
    //load data from api

    // if (stockReducer.searchValues.name !== paginated.searchValues.name) {
    // alert(stockReducer.searchValues.name);
    // setPaginated({
    //   ...paginated,
    //   page: 1,
    //   searchValues: stockReducer.searchValues,
    // });
    loadData();
    //  }
  }, [stockReducer.searchValues]);

  React.useEffect(() => {
    //load data from api
    loadData();
  }, [paginated]);

  const loadData = () => {
    setIsLoading(true);
    debugger;
    stockAxios
      .getStockFilter(
        paginated.orderingField,
        paginated.ascendingOrder,
        paginated.page,
        paginated.recordsPerPage,
        stockReducer.searchValues.name,
        stockReducer.searchValues.isactive.toString()
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
      <MUIDataTable
        title={
          <Typography variant="h6">
            ProductList
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
    </div>
  );
}

export default StockTable;
