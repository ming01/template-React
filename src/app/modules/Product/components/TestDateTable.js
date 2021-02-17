import React from "react";
import Table from "../components/Common/DateTable";
import * as stockAxios from "../_redux/productAxios";
import { useSelector } from "react-redux";

function TestDateTable(props) {
  const stockReducer = useSelector(({ stock }) => stock);
  const [data, setData] = React.useState([]);

  const columns = [
    "id",
    "product.productGroup.name",
    "product.name",
    "product.price",
    "product.qty",
  ];

  const [paginated, setPaginated] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  });

  React.useEffect(() => {
    //load data from api
    loadData();
  }, [stockReducer.searchValues, paginated]);

  const handleTableChange = async (values) => {
    await setPaginated({
      ...paginated,
      page: values.page,
      recordsPerPage: values.recordsPerPage,
      ascendingOrder: values.ascendingOrder,
      orderingField: values.orderingField,
    });
  };

  const loadData = () => {
    stockAxios
      .getStockFilter(
        paginated.orderingField,
        paginated.ascendingOrder,
        paginated.page,
        paginated.recordsPerPage,
        "",
        true
      )
      .then((res) => {
        if (res.data.isSuccess) {
          setData(res.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Table
      columns={columns}
      data={data}
      TableChange={handleTableChange.bind(this)}
    ></Table>
  );
}

export default TestDateTable;
