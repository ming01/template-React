import React from "react";
import ProductGroupTable from "../components/ProductTable";

function ProductList(props) {
  return <ProductGroupTable history={props.history}></ProductGroupTable>;
}

export default ProductList;
