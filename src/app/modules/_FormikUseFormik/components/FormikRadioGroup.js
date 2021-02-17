/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";

function FormikRadioGroup(props) {
  return (
    <FormControl
      component="fieldset"
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup
        row
        aria-label="quiz"
        name={props.name}
        value={props.formik.values[`${props.name}`]}
        onChange={(event) => {
            props.formik
            .setFieldValue(props.name, event.target.value)
        }}
        onBlur={() => {
          props.formik.setFieldTouched([`${props.name}`], true, true) 
        }}
      >
        {props.data.map((item) => (
          <FormControlLabel
            key={`${props.name}_${item[`${props.valueFieldName}`]}`}
            value={item[`${props.valueFieldName}`]}
            control={<Radio />}
            label={item[`${props.displayFieldName}`]}
          />
        ))}
      </RadioGroup>
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] && (
          <FormHelperText>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}
FormikRadioGroup.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  valueFieldName: PropTypes.string,
  displayFieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

FormikRadioGroup.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  //value for radioGroup ต้องเป็น string (https://github.com/mui-org/material-ui/issues/8180)
  data: [{ id: '0', name: "Do not forget to set data" }],
  valueFieldName: "id",
  displayFieldName: "name",
  disabled: false,
};

export default FormikRadioGroup;
