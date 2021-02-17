/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

function FormikCheckBoxGroup(props) {
  return (
      <FormControl
        error={
          props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`]
        }
        component="fieldset"
      >
        <FormLabel component="legend">{props.label}</FormLabel>
        <FormGroup row>
          {props.data.map((item) => (
              <FormControlLabel
              onBlur={() => {
                props.formik.setFieldTouched([`${props.name}`], true, true) 
              }}
                key={`${props.name}_${item[`${props.valueFieldName}`]}`}
                control={
                  <Checkbox
                    checked={props.formik.values[props.name].includes(
                      item[`${props.valueFieldName}`]
                    )}
                    onChange={(e) => {
                        let newValue = [...props.formik.values[`${props.name}`]];
                        if (e.target.checked) {
                          newValue.push(item[`${props.valueFieldName}`]);
                        } else {
                          const idx = newValue.indexOf(
                            item[`${props.valueFieldName}`]
                          );
                          newValue.splice(idx, 1)
                          ;
                        }
                        props.formik.setFieldValue(props.name, newValue)
                    }}
                    name={`${props.name}_${item[`${props.valueFieldName}`]}`}
                  />
                }
                label={item[`${props.displayFieldName}`]}
              />
          ))}
        </FormGroup>
        {props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`] && (
            <FormHelperText>
              {props.formik.errors[`${props.name}`]}
            </FormHelperText>
          )}
      </FormControl>
  );
}
FormikCheckBoxGroup.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  valueFieldName: PropTypes.string,
  displayFieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

FormikCheckBoxGroup.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  data: [{ id: 0, name: "Do not forget to set data" }],
  valueFieldName: "id",
  displayFieldName: "name",
  disabled: false,
};

export default FormikCheckBoxGroup;
