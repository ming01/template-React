import ProductGroupTable from "../components/ProductGroupTable";
import React from "react";

function ProductGroupList(props) {
  return (
    <div>
      <ProductGroupTable history={props.history}></ProductGroupTable>
    </div>
  );
}

export default ProductGroupList;
