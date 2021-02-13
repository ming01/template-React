/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import * as CONST from "../../../../Constants";
import Axios from "axios";

function DropdownTitle(props) {
  const title_api_url = `${CONST.API_URL}/Workshop/title`;

  const [title, setTitle] = React.useState([]);

  React.useEffect(() => {
    Axios.get(title_api_url)
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setTitle(res.data.data);
        } else {
          //internal error
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        alert(err.message);
      });
  }, []);

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
      >
        <MenuItem disabled value={0}>
          กรุณาเลือก
        </MenuItem>
        {title.map((item) => (
          <MenuItem key={`${props.name}_${item.titleId}`} value={item.titleId}>
            {item.titleName}
          </MenuItem>
        ))}
      </Field>
      {props.touched[`${props.name}`] && (
        <FormHelperText>
          {props.errors[`${props.name}_errorText`]}
        </FormHelperText>
      )}
    </FormControl>
  );
}

DropdownTitle.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

// Same approach for defaultProps too
DropdownTitle.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: "",
  label: "",
};

export default DropdownTitle;
