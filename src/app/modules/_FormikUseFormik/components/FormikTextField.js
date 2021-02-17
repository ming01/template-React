/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

function FormikTextField(props) {
  // formik need these properties to connect with material ui
  // onBlur
  // onChange
  // value
  // error
  // helperText

  return (
    <TextField
      name={props.name}
      label={props.label}
      fullWidth
      onBlur={props.formik.handleBlur}
      onChange={props.formik.handleChange}
      value={props.formik.values[`${props.name}`]}
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
      helperText={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] &&
        props.formik.errors[`${props.name}`]
      }
      disabled={props.disabled}
    />
  );
}

FormikTextField.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

// Same approach for defaultProps too
FormikTextField.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false
};

export default FormikTextField;
