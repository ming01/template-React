import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";

function FormikDatePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils} locale="th">
      <DatePicker
        fullWidth
        name={props.name}
        format="DD/MM/YYYY"
        label={props.label}
        views={["year", "month", "date"]}
        value={props.formik.values[`${props.name}`]}
        onChange={(value) => {
          props.formik.setFieldValue(props.name, value);
        }}
        error={
          props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`]
        }
        onBlur={() => {
          props.formik.setFieldTouched([`${props.name}`], true, true) 
        }}
        helperText={props.formik.errors[`${props.name}`]}
        disabled={props.disabled}
        disableFuture={props.disableFuture}
        disablePast={props.disablePast}
      />
    </MuiPickersUtilsProvider>
  );
}

FormikDatePicker.propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool
  };
  
  // Same approach for defaultProps too
  FormikDatePicker.defaultProps = {
    formik: {},
    name: "Do not forget to set name",
    label: "Do not forget to set label",
    disabled: false,
    disableFuture: false,
    disablePast: false
  };

export default FormikDatePicker;
