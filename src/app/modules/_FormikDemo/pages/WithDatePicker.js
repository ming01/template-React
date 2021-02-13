/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core"
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
} from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers"

import DayJsUtils from '@date-io/dayjs';
require('dayjs/locale/th')
var dayjs = require('dayjs')
dayjs.locale('th')


function WithDatePicker() {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Formik
        //Form fields and default values
        initialValues={{
          birthDate: dayjs(),
        }}
        //Validation section
        validate={(values) => {
          const errors = {};
          //

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
                <Field fullWidth component={DatePicker} label="label" name="birthDate" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Field fullWidth component={DateTimePicker} label="label" name="birthDate" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Field fullWidth component={TimePicker} label="label" name="birthDate" />
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
    </MuiPickersUtilsProvider>
  );
}

export default WithDatePicker;
