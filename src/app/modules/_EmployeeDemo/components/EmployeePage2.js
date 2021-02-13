/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button,  Grid } from "@material-ui/core";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import { TextField } from "formik-material-ui";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useSelector, useDispatch } from "react-redux";
import * as employeeRedux from "../_redux/employeeRedux";
import * as commonValidators from '../../Common/functions/CommonValidators'

import DayJsUtils from "@date-io/dayjs";
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function EmployeePage2() {
  const dispatch = useDispatch();
  const employeeReducer = useSelector(({ employee }) => employee);
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Formik
        enableReinitialize
        //Form fields and default values
        initialValues={{
          genderId: employeeReducer.currentEmployeeToAdd.genderId,
          identityCardNo: employeeReducer.currentEmployeeToAdd.identityCardNo,
          dateOfBirth: employeeReducer.currentEmployeeToAdd.dateOfBirth,
        }}
        //Validation section
        validate={(values) => {
          const errors = {};
          //TODO validate select gender

          //validate id card
          if (!commonValidators.validateThaiCitizenID(values.identityCardNo)) {
            errors.identityCardNo = 'รูปแบบไม่ถูกต้อง'
          }

          return errors;
        }}
        //Form Submission
        // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // Save data to redux
          // clone object & update value
          let objPayload = {
            ...employeeReducer.currentEmployeeToAdd,
            genderId: values.genderId,
            identityCardNo: values.identityCardNo,
            dateOfBirth: values.dateOfBirth,
          };

          // save to redux
          dispatch(employeeRedux.actions.updateCurrentEmployee(objPayload));
          dispatch(
            employeeRedux.actions.setCurrentPage(
              employeeReducer.currentPage + 1
            )
          );
        }}
      >
        {/* Render form */}
        {({ submitForm, isSubmitting, values, errors }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid container item xs={12} lg={3}>
                {/* Start gender */}
                <Field row component={RadioGroup} name="genderId">
                  <FormControlLabel
                    value="1"
                    control={<Radio disabled={isSubmitting} />}
                    label="Male"
                    disabled={isSubmitting}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio disabled={isSubmitting} />}
                    label="Female"
                    disabled={isSubmitting}
                  />
                </Field>
              </Grid>

              {/* Start Card No */}
              <Grid item xs={12} lg={3}>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  type="text"
                  label="Card No"
                  name="identityCardNo"
                />
              </Grid>
              {/* End Card No */}

              {/* Start dateOfBirth */}
              <Grid item xs={12} lg={3}>
                <Field
                  fullWidth
                  component={DatePicker}
                  label="Birth Date"
                  name="dateOfBirth"
                />
              </Grid>
              {/* End birthDate */}

              {/* Start Button */}
              <Grid
                container
                style={{ marginTop: 5 }}
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3} lg={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={() => {
                      dispatch(
                        employeeRedux.actions.setCurrentPage(
                          employeeReducer.currentPage - 1
                        )
                      );
                    }}
                  >
                    Back
                    <NavigateBefore></NavigateBefore>
                  </Button>
                </Grid>
                <Grid item xs={3} lg={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Next
                    <NavigateNextIcon></NavigateNextIcon>
                  </Button>
                </Grid>
              </Grid>
              {/* End Button */}
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

export default EmployeePage2;
