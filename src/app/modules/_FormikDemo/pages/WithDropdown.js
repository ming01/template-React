/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { Select } from "formik-material-ui";

import DropdownTitle from "../components/DropdownTitle";

import Casecade from "../components/CaseCade";

function WithDropdown() {
  return (
    <Formik
      //Form fields and default values
      initialValues={{
        titleId: "",
        t1: 0,
        t2: 0,
        p1_provinceId: 0,
        p1_districtId: 0,
        p1_subDistrictId: 0,
      }}
      //Validation section
      validate={(values) => {
        const errors = {};

        if (values.p1_provinceId === 0) {
          errors.p1_provinceId_isError = true;
          errors.p1_provinceId_errorText = "please select";
        }

        if (values.p1_districtId === 0) {
          errors.p1_districtId_isError = true;
          errors.p1_districtId_errorText = "please select";
        }

        if (values.p1_subDistrictId === 0) {
          errors.p1_subDistrictId_isError = true;
          errors.p1_subDistrictId_errorText = "please select";
        }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {/* Render form */}
      {({
        submitForm,
        isSubmitting,
        values,
        errors,
        setFieldValue,
        touched,
      }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="titleId-simple">Title</InputLabel>
                <Field
                  component={Select}
                  name="titleId"
                  inputProps={{
                    id: "titleId-simple",
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Field>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <DropdownTitle
                touched={touched}
                values={values}
                errors={errors}
                name="t1"
                label="Title1"
              ></DropdownTitle>
            </Grid>
            <Grid item xs={12} lg={6}>
              <DropdownTitle
                  touched={touched}
                  values={values}
                  errors={errors}
                  name="t2"
                  label="Title2"
              ></DropdownTitle>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Casecade
                name="p1"
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
              ></Casecade>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ marginTop: 10 }}
            >
              <Grid item xs={12} lg={3}>
                {isSubmitting && <LinearProgress />}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <br></br>
          values :{JSON.stringify(values)}
          <br></br>
          errors :{JSON.stringify(errors)}
        </Form>
      )}
    </Formik>
  );
}

export default WithDropdown;
