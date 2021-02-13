//http://uat.siamsmile.co.th:9188/swagger/index.html
/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form } from "formik";
import { Button,  Grid } from "@material-ui/core";
import HobbyCheckList from "../components/HobbyCheckList";
import Check from "@material-ui/icons/Check";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { useSelector, useDispatch } from "react-redux";
import * as employeeRedux from "../_redux/employeeRedux";
import * as employeeAxios from "../_redux/employeeAxios";
import * as swal from "../../Common/components/SweetAlert";
import { useParams } from "react-router-dom";

function EmployeePage4(props) {
  const dispatch = useDispatch();
  const employeeReducer = useSelector(({ employee }) => employee);

  let { id } = useParams();

  const handleAdd = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    employeeAxios
      .addEmployee(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              dispatch(employeeRedux.actions.resetCurrentEmployee());
              props.history.push('/employee')
            });
        } else {
          //internal error
          // alert(res.data.message)
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleEdit = ({ setSubmitting }, objPayload) => {
    // console.log(JSON.stringify(objPayload));
    //connect api
    console.log(JSON.stringify(objPayload))
    employeeAxios
      .editEmployee(objPayload,id)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `edited id: ${res.data.data.id}`)
            .then(() => {
              dispatch(employeeRedux.actions.resetCurrentEmployee());
              props.history.push('/employee')
            });
        } else {
          //internal error
          // alert(res.data.message)
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        //error network
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      enableReinitialize
      //Form fields and default values
      initialValues={{
        hobbies: employeeReducer.currentEmployeeToAdd.hobbies,
      }}
      //Validation section
      validate={(values) => {
        const errors = {};

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        let confirmMessage = (!id) ? "Confirm Add?" : "Confirm Edit?";

        swal.swalConfirm("Confirm save?", confirmMessage).then((result) => {
          if (result.isConfirmed) {
            //prepare objPayload for post api
            // clone object
            let objPayload = {
              ...employeeReducer.currentEmployeeToAdd,
              hobbies: values.hobbies,
              subDistrictId:
                employeeReducer.currentEmployeeToAdd.employee_subDistrictId,
              genderId: parseInt(employeeReducer.currentEmployeeToAdd.genderId),
            };
            // check add or edit
            if (!id) {
              //add
              handleAdd({ setSubmitting }, objPayload);
            } else {
              //edit
              handleEdit({ setSubmitting }, objPayload);
            }
          }
        });
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <HobbyCheckList name="hobbies" values={values}></HobbyCheckList>
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
                  Finish
                  <Check></Check>
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

export default EmployeePage4;
