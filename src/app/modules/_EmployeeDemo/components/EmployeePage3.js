/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button,  Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Casecade from '../../_FormikDemo/components/CaseCade'
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import {useSelector, useDispatch} from 'react-redux'
import * as employeeRedux from '../_redux/employeeRedux'

function EmployeePage3() {
    const dispatch = useDispatch()
    const employeeReducer = useSelector(({employee})=>employee)
  return (
    <Formik
      enableReinitialize
      //Form fields and default values
      initialValues={{
        address1: employeeReducer.currentEmployeeToAdd.address1,
        address2: employeeReducer.currentEmployeeToAdd.address2,
        employee_provinceId: employeeReducer.currentEmployeeToAdd.employee_provinceId,
        employee_districtId: employeeReducer.currentEmployeeToAdd.employee_districtId,
        employee_subDistrictId: employeeReducer.currentEmployeeToAdd.employee_subDistrictId,
        postCode:employeeReducer.currentEmployeeToAdd.postCode
      }}
      //Validation section
      validate={(values) => {
        const errors = {};

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
              address1: values.address1,
              address2: values.address2,
              employee_provinceId: values.employee_provinceId,
              employee_districtId: values.employee_districtId,
              employee_subDistrictId: values.employee_subDistrictId,
              postCode: values.postCode,
            };


            // save to redux
            dispatch(employeeRedux.actions.updateCurrentEmployee(objPayload));
            dispatch(
              employeeRedux.actions.setCurrentPage(
                employeeReducer.currentPage + 1
              )
            );

          dispatch(employeeRedux.actions.setCurrentPage(employeeReducer.currentPage +1))
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Address Line 1"
                name="address1"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Address Line 2"
                name="address2"
              />
            </Grid>
            
            <Grid item xs={12} lg={6}>
              <Casecade
                name="employee"
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
              ></Casecade>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Post Code"
                name="postCode"
              />
            </Grid>

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
                        dispatch(employeeRedux.actions.setCurrentPage(employeeReducer.currentPage -1))
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
  );
}

export default EmployeePage3;
