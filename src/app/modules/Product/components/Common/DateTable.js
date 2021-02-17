import * as React from "react";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function DateTable(props) {
  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const options = {
    ...props.defaultoptions,
    count: totalRecords,
    page: paginated.page - 1,
    rowsPerPage: paginated.recordsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setPaginated({ ...paginated, page: tableState.page + 1 });
          props.TableChange({ ...paginated, page: tableState.page + 1 });
          break;
        case "sort":
          setPaginated({
            ...paginated,
            orderingField: `${tableState.sortOrder.name}`,
            ascendingOrder:
              tableState.sortOrder.direction === "asc" ? true : false,
          });
          props.TableChange({
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
          props.TableChange({
            ...paginated,
            recordsPerPage: tableState.rowsPerPage,
          });
          break;

        default:
      }
    },
  };

  React.useEffect(() => {
    //load data from api
    if (props.data.isSuccess) {
      flatData();
    }
  }, [props.data]);

  const flatData = () => {
    setIsLoading(true);
    debugger;

    if (props.data.isSuccess) {
      //flatten data
      debugger;
      const flatData = [];
      if (props.data.totalAmountRecords > 0) {
        props.data.data.forEach((element) => {
          flatData.push(flatten(element));
        });
      }
      setData(flatData);
      setTotalRecords(props.data.totalAmountRecords);
    } else {
      alert(props.data.message);
    }

    setTotalRecords(props.data.totalAmountRecords);
    setIsLoading(false);
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
        columns={props.columns}
        options={options}
      />
    </div>
  );
}

DateTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.string,
  options: PropTypes.string,
};

DateTable.defaultProps = {
  columns: ["id", "name"],
  data: [
    { id: 1, name: "ming01" },
    { id: 2, name: "khunmiw" },
  ],
  defaultoptions: {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: "none",
    serverSide: true,
  },
};

export default DateTable;

//props.columns
//props.data
