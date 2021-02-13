/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DropdownTitle from '../../_FormikDemo/components/DropdownTitle'
import {useSelector, useDispatch} from 'react-redux'
import * as employeeRedux from '../_redux/employeeRedux'
import axios from 'axios'
import * as swal from '../../Common/components/SweetAlert'

function EmployeePage1() {
  const dispatch = useDispatch()
  const employeeReducer = useSelector(({employee})=>employee)

  const validateLastName = (input) => {
    return (input === 'salmon')
  }

  const getVersion = async () => {
    let result
    await axios.get('http://uat.siamsmile.co.th:9188/api/clientversion').then((res) => {
      result = res.data.data.clientVersion
      console.log(res.data)
    }).catch((err) => {
      alert(err.message)
    })
    return  result
  }

  return (
    <Formik
      enableReinitialize
      //Form fields and default values
      initialValues={{
        titleId: employeeReducer.currentEmployeeToAdd.titleId,
        employeeCode: employeeReducer.currentEmployeeToAdd.employeeCode,
        firstName: employeeReducer.currentEmployeeToAdd.firstName,
        lastName: employeeReducer.currentEmployeeToAdd.lastName,
      }}
      //Validation section
      validate={async (values) => {
        const errors = {};
        //Validate form

        if (!values.titleId) {
          errors.titleId_isError = true;
          errors.titleId_errorText = "Required";
        }

        if (!values.firstName) {
          errors.firstName = "Required";
        }

        if (!validateLastName(values.lastName)) {
          errors.lastName = "Please put salmon";
        }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={async (values, { setSubmitting }) => {
        //validate api -- duplicate code
        let version = await getVersion()
        if (values.employeeCode === version) {
          swal.swalError("Error",'duplicate code')
          return
        }

        // Save data to redux
        // clone & update value
        let objPayload = {
          ...employeeReducer.currentEmployeeToAdd,
          titleId: values.titleId,
          employeeCode: values.employeeCode,
          firstName: values.firstName,
          lastName: values.lastName,
        };

        // save to redux
        dispatch(employeeRedux.actions.updateCurrentEmployee(objPayload));

        dispatch(
          employeeRedux.actions.setCurrentPage(employeeReducer.currentPage + 1)
        );

        setSubmitting(false);
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <DropdownTitle
                name="titleId"
                label="Title"
                touched={touched}
                errors={errors}
              ></DropdownTitle>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Employee Code"
                name="employeeCode"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="First Name"
                name="firstName"
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Last Name"
                name="lastName"
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
              {isSubmitting && <LinearProgress />}
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
          <br></br>
          touched : {JSON.stringify(touched)}
        </Form>
      )}
    </Formik>
  );
}

export default EmployeePage1;
