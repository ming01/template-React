import React from "react";
import PropTypes from "prop-types";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";

function FormikDateTimePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils} locale="th">
      <KeyboardDateTimePicker
        fullWidth
        name={props.name}
        variant="inline"
        ampm={false}
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
          props.formik.setFieldTouched([`${props.name}`], true, true);
        }}
        helperText={props.formik.errors[`${props.name}`]}
        onError={console.log}
        disabled={props.disabled}
        disableFuture={props.disableFuture}
        disablePast={props.disablePast}
        format="DD/MM/YYYY HH:mm"
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
}

FormikDateTimePicker.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
};

// Same approach for defaultProps too
FormikDateTimePicker.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  disableFuture: false,
  disablePast: false,
};

export default FormikDateTimePicker;
