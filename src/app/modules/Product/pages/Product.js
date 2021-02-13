import React from "react";
import NewProduct from "../components/NewProduct";
import * as productAxios from "../_redux/productAxios";
import * as productRedux from "../_redux/productRedux";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as swal from "../../Common/components/SweetAlert";

function Product(props) {
  const dispatch = useDispatch();
  const productReducer = useSelector(({ product }) => product);
  let { id } = useParams();
  const loadData = () => {
    productAxios
      .getProductid(id)
      .then(async (res) => {
        if (res.data.isSuccess) {
          console.log(JSON.stringify(res.data.data));
          let apiData = res.data.data;
          debugger;
          // clone & update value
          let objPayload = {
            ...productReducer.currentProductToAdd,
            name: apiData.name,
            isActive: apiData.isActive,
            id: apiData.id,
            price: apiData.price,
            qty: apiData.qty,
            productGroupId: apiData.productGroupId,
          };
          debugger;
          // save to redux
          dispatch(productRedux.actions.updateCurrentProduct(objPayload));
        } else {
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  React.useEffect(() => {
    //load data from api
    debugger;
    if (id !== undefined) {
      loadData();
    }
  }, [id]);
  return <NewProduct history={props.history}></NewProduct>;
}

export default Product;
