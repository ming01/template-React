/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from 'prop-types'
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel'

function FormikCheckBox(props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={props.name}
          checked={props.formik.values[`${props.name}`]}
          onBlur={props.formik.handleBlur}
          onChange={props.formik.handleChange}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
}

FormikCheckBox.propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
}

FormikCheckBox.defaultProps = {
    formik: {},
    name:'Do not forget to set name',
    label: 'Do not forget to set label',
    disabled: false
}

export default FormikCheckBox;
