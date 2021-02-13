/* eslint-disable no-restricted-imports */
//import json2mq from "json2mq";
import * as React from "react";
import NewProductGroup from "../components/NewProductGroup";
import * as productgroupAxios from "../_redux/productAxios";
import * as productgroupRedux from "../_redux/productRedux";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as swal from "../../Common/components/SweetAlert";

function ProductGroup(props) {
  const dispatch = useDispatch();
  const productgroupReducer = useSelector(({ productgroup }) => productgroup);
  let { id } = useParams();
  const loadData = () => {
    productgroupAxios
      .getProductGroupid(id)
      .then(async (res) => {
        if (res.data.isSuccess) {
          debugger;
          console.log(JSON.stringify(res.data.data));
          let apiData = res.data.data;

          // clone & update value
          let objPayload = {
            ...productgroupReducer.updateCurrentProductGroup,
            name: apiData.name,
            isActive: apiData.isActive,
            id: apiData.id,
          };

          // save to redux
          dispatch(
            productgroupRedux.actions.updateCurrentProductGroup(objPayload)
          );
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

  return (
    <div>
      <NewProductGroup history={props.history}></NewProductGroup>
    </div>
  );
}

export default ProductGroup;
