/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import CardIdTextMask from "../../Common/components/CustomInput/CardIdTextMask";
import PhoneNoTextMask from "../../Common/components/CustomInput/PhoneNoTextMask";
import * as commonValidators from '../../Common/functions/CommonValidators'

function WithTextField() {
  return (
    <Formik
      //Form fields and default values
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      //Validation section
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (values.password === "1234") {
          errors.password = "Dont use 1234";
        }

        if (!values.firstName) {
          errors.firstName = "Required";
        }

        if (!values.lastName) {
          errors.lastName = "Required";
        }

        if (!commonValidators.validateThaiCitizenID(values.idCard)) {
          errors.idCard = 'invalid format'
        }

        if (!commonValidators.validatePhoneNumber(values.phoneNumber)) {
          errors.phoneNumber = 'invalid format'
        }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          let objPayload = {...values,idCard: values.idCard.replaceAll('-','')}
          alert(JSON.stringify(objPayload, null, 2));
        }, 500);
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors }) => (
        <Form>
          <Grid container spacing={3}>
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
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                type="password"
                label="Password"
                name="password"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="IDCard"
                name="idCard"
                InputProps={{
                  inputComponent: CardIdTextMask,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Field
                fullWidth
                component={TextField}
                required
                type="text"
                label="Phone Number"
                name="phoneNumber"
                InputProps={{
                  inputComponent: PhoneNoTextMask,
                }}
              />
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

export default WithTextField;
