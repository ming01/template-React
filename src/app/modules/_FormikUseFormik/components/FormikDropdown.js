import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core/";

function FormikDropdown(props) {
  return (
    <FormControl
      fullWidth
      disabled={props.disabled}
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        name={props.name}
        value={props.formik.values[`${props.name}`]}
        onBlur={props.formik.handleBlur}
        onChange={(event) => {
          props.formik
            .setFieldValue(props.name, event.target.value)
            .then(props.selectedCallback(event.target.value));
        }}
      >
        <MenuItem disabled={props.disableFirstItem} value={0}>
          <em>{props.firstItemText}</em>
        </MenuItem>
        {props.data.map((item) => (
          <MenuItem
            key={`${props.name}_${item[`${props.valueFieldName}`]}`}
            value={item[`${props.valueFieldName}`]}
          >
            {item[`${props.displayFieldName}`]}
          </MenuItem>
        ))}
      </Select>
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] && (
          <FormHelperText>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}

FormikDropdown.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  valueFieldName: PropTypes.string,
  displayFieldName: PropTypes.string,
  firstItemText: PropTypes.string,
  disableFirstItem: PropTypes.bool,
  selectedCallback: PropTypes.func,
  disabled: PropTypes.bool
};

// Same approach for defaultProps too
FormikDropdown.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  data: [{ id: 0, name: "Do not forget to set data" }],
  valueFieldName: "id",
  displayFieldName: "name",
  firstItemText: "Do not forget to set firstItemText",
  disableFirstItem: true,
  selectedCallback: () => {},
  disabled: false
};

export default FormikDropdown;
