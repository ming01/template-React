import React from "react";
import EditStock from "../../components/Stock/EditStock";

function Stock(props) {
  return <EditStock history={props.history}></EditStock>;
}

export default Stock;
