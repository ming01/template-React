/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import VisibilityIcon from '@material-ui/icons/Visibility';
import purple from '@material-ui/core/colors/purple'

function ViewButton(props) {
  return (
    <Button 
      {...props}
      variant="contained"
      style={{backgroundColor:purple[300]}}
      startIcon={<VisibilityIcon />}
    >{props.children}</Button>
  );
}

export default ViewButton;
