/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { CheckboxWithLabel } from "formik-material-ui";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";

function WithCheckboxAndRadio() {
  return (
    <Formik
      //Form fields and default values
      initialValues={{
        gender: "M",
        isActive: false,
      }}
      //Validation section
      validate={(values) => {
        const errors = {};
        //TODO validate select gender

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
      {({ submitForm, isSubmitting, values, errors }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="isActive"
                Label={{ label: "isActive" }}
              />
            </Grid>

            <Grid container item xs={12} lg={6}>
              <Field row component={RadioGroup} name="gender">
                <FormControlLabel
                  value="M"
                  control={<Radio disabled={isSubmitting} />}
                  label="Male"
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  value="F"
                  control={<Radio disabled={isSubmitting} />}
                  label="Female"
                  disabled={isSubmitting}
                />
              </Field>
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

export default WithCheckboxAndRadio;
