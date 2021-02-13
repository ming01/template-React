/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

function AddButton(props) {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
    >{props.children}</Button>
  );
}

export default AddButton;
