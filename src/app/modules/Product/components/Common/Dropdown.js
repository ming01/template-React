import React from "react";
import { Select } from "formik-material-ui";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

function Dropdown(props) {
  return (
    <FormControl
      fullWidth
      error={
        props.errors[`${props.name}_isError`] && props.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor="titleId-simple">{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        inputProps={{
          id: "titleId-simple",
        }}
        // onChange={(event) => {
        //   props.setFieldValue(event.target.name, event.target.value);
        // }}
      >
        <MenuItem disabled value={0}>
          กรุณาเลือก
        </MenuItem>
        {props.whatSoever === true && <MenuItem value={0}>ทั้งหมด</MenuItem>}
        {props.setDropDown.map((item) => (
          <MenuItem
            key={`${props.name}_${item[`${props.dropDownId}`]}`}
            value={item[`${props.dropDownId}`]}
          >
            {item[`${props.dropDownValue}`]}
          </MenuItem>
        ))}
      </Field>
      {props.errors[`${props.name}_isError`] &&
        props.touched[`${props.name}`] && (
          <FormHelperText>
            {props.errors[`${props.name}_errorText`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}

Dropdown.propTypes = {
  values: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  whatSoever: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setDropDown: PropTypes.array,
  dropDownValue: PropTypes.string,
  dropDownId: PropTypes.string,
};

Dropdown.defaultProps = {
  values: {},
  name: "commonByMing01",
  label: "dropDown",
  whatSoever: false,
  touched: {},
  errors: {},
  setDropDown: [
    { id: 1, value: "ming01" },
    { id: 2, value: "khunmiw" },
  ],
  dropDownValue: "value",
  dropDownId: "id",
};

export default Dropdown;
