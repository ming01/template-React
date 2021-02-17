/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import {Grid,Button,TextField} from "@material-ui/core/";


function WithTextField() {
  const [test, setTest] = React.useState("");

  React.useEffect(() => {
    setTest('test')
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.test) {
        errors.test =  "required";
      }

      if (!values.firstName) {
        errors.firstName = "required";
      }

      if (!values.lastName) {
        errors.lastName =  "required";
      }
      return errors;
    },
    initialValues: {
      firstName: "",
      lastName: "",
      test: test,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <TextField
            name="test"
            label="Test"
            required
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.test}
            error={(formik.errors.test && formik.touched.test)}
            helperText={(formik.errors.test && formik.touched.test) && formik.errors.test}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            name="firstName"
            label="First Name"
            required
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={(formik.errors.firstName && formik.touched.firstName)}
            helperText={(formik.errors.firstName && formik.touched.firstName) && formik.errors.firstName}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            name="lastName"
            label="Last Name"
            required
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={(formik.errors.lastName && formik.touched.lastName)}
            helperText={(formik.errors.lastName && formik.touched.lastName) && formik.errors.lastName}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button type="submit" fullWidth variant="contained">Submit</Button>
        </Grid>
      </Grid>

      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
    </form>
  );
}

export default WithTextField;
