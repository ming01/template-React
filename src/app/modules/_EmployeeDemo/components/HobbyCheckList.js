/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { FieldArray } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

function HobbyCheckList(props) {
  const [hobbyList] = React.useState([
    { hobbyId: 1, hobbyName: "Movies", iconName: "theaters" },
    { hobbyId: 2, hobbyName: "Swimming", iconName: "pool" },
    { hobbyId: 3, hobbyName: "Books", iconName: "menu_book" },
    { hobbyId: 4, hobbyName: "Golf", iconName: "sports_golf" },
    { hobbyId: 5, hobbyName: "Games", iconName: "videogame_asset" },
    { hobbyId: 6, hobbyName: "Travel", iconName: "flight" },
    { hobbyId: 7, hobbyName: "Cooking", iconName: "food_bank" },
  ]);

  return (
    <FieldArray
      name={props.name}
      render={(arrayHelpers) => (
        <Grid container spacing={1}>
          {hobbyList.map((item) => (
            <Grid item key={item.hobbyId}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.values[props.name].includes(item.hobbyId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        arrayHelpers.push(item.hobbyId);
                      } else {
                        const idx = props.values[props.name].indexOf(
                          item.hobbyId
                        );
                        arrayHelpers.remove(idx);
                      }
                    }}
                    color="primary"
                  />
                }
                label={
                  <>
                    <Icon style={{ marginRight: 5 }}>{item.iconName}</Icon>
                    {item.hobbyName}
                  </>
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    />
  );
}

HobbyCheckList.propTypes = {
  name: PropTypes.string,
  values: PropTypes.object,
};

// Same approach for defaultProps too
HobbyCheckList.defaultProps = {
  name: "hobbyCheckBox",
  values: {},
};


export default HobbyCheckList;
