import * as React from "react";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import * as productAxios from "../_redux/productAxios";

function DropdownProductGroup(props) {
  const [group, setGroup] = React.useState([]);

  React.useEffect(() => {
    productAxios
      .getProductGroup()
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setGroup(res.data.data);
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
    <FormControl fullWidth>
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

        {/* {props.All == true ? <MenuItem value={0}>ทั้งหมด</MenuItem> : ""} */}

        {group.map((item) => (
          <MenuItem key={`${props.name}_${item.id}`} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  );
}

export default DropdownProductGroup;
