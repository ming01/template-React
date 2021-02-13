import React from "react";

function Clock() {
    const [time, setTime] = React.useState('')
    var dayjs = require("dayjs");
    var localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)

  React.useEffect(() => {
    setTime(dayjs().format('lll'))
    const interval = setInterval(() => {
        setTime(dayjs().format('lll'))
      }, 60000);

      return () => {
        clearInterval(interval);
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <span
      className="text-primary font-weight-bold"
      id="kt_dashboard_daterangepicker_date"
    >
      {time}
    </span>
  );
}

export default Clock;
