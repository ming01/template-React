import React from "react";
import PropTypes from "prop-types";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";

function FormikTimePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils} locale="th">
        <KeyboardTimePicker
        fullWidth
        name={props.name}
        ampm={false}
        views={(props.showSecond)? ["hours", "minutes", "seconds"]:["hours", "minutes"]}
        format={(props.showSecond)? "HH:mm:ss": "HH:mm"}
        label={props.label}
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

FormikTimePicker.propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    showSecond: PropTypes.bool
  };
  
  // Same approach for defaultProps too
  FormikTimePicker.defaultProps = {
    formik: {},
    name: "Do not forget to set name",
    label: "Do not forget to set label",
    disabled: false,
    disableFuture: false,
    disablePast: false,
    showSecond: false,
  };

export default FormikTimePicker;
