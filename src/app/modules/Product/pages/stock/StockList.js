import React from "react";
import StockMonitor from "../../components/Stock/StockMonitor";
import StockSearch from "../../components/Stock/StockSearch";
import StockTable from "../../components/Stock/StockTable";

function StockList(props) {
  return (
    <div>
      <StockSearch history={props.history} />
      <StockTable history={props.history} />
    </div>
  );
  //  <StockMonitor history={props.history}></StockMonitor>;
}

export default StockList;
