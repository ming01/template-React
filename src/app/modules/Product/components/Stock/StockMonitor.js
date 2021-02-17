import * as React from "react";
import StockSearch from "../Stock/StockSearch";
import StockTable from "../Stock/StockTable";

function StockMonitor(props) {
  const [search, setSearch] = React.useState({});

  const handleSearch = (values) => {
    setSearch(values);
    alert(search.name);
    console.log(JSON.stringify(search));
  };
  return (
    <div>
      <StockSearch
        history={props.history}
        submit={handleSearch.bind(this)}
      ></StockSearch>
      <StockTable history={props.history} search={search} />
    </div>
  );
}

export default StockMonitor;
