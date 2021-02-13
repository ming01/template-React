/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as swal from "../../Common/components/SweetAlert";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as productgroupRedux from "../_redux/productRedux";
import * as productgroupAxios from "../_redux/productAxios";

function NewProductGroup(props) {
  const dispatch = useDispatch();
  const productgroupReducer = useSelector(({ productgroup }) => productgroup);
  let { id } = useParams();

  const handleAdd = ({ setSubmitting, objPayload }) => {
    //console.log(JSON.stringify(objPayload));
    // alert(objPayload.name);
    //connect api
    productgroupAxios
      .addProductGroup(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success

          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              debugger;
              dispatch(productgroupRedux.actions.resetProductGroup());
              props.history.push("/ProductGroupList/");
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

  const handleEdit = ({ setSubmitting, objPayload }) => {
    //console.log(JSON.stringify(objPayload));
    //connect api

    productgroupAxios
      .editProductGroup(objPayload)
      .then((res) => {
        debugger;
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `Edit id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productgroupRedux.actions.resetProductGroup());
              props.history.push("/ProductGroupList/");
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

  React.useEffect(() => {
    //load data from api
    return () => {
      dispatch(productgroupRedux.actions.resetProductGroup());
    };
  }, [id]);

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Conditions
        </Typography>
        <Formik
          //Form fields and default values
          enableReinitialize
          initialValues={{
            productgroupName: productgroupReducer.currentProductGroupToAdd.name,
            id: productgroupReducer.currentProductGroupToAdd.id,
            IsActive: productgroupReducer.currentProductGroupToAdd.isActive,
            ActiveName: productgroupReducer.currentProductGroupToAdd.isActive
              ? "ใช้งาน"
              : "ยกเลิก",
          }}
          //Validation section
          validate={(values) => {
            const errors = {};

            if (!values.productgroupName) {
              errors.productgroupName = "Required ProductGroupName";
            }

            return errors;
          }}
          //Form Submission
          // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
          onSubmit={(values, { setSubmitting }) => {
            let confirmMessage = "";
            if (!id) {
              confirmMessage = "Confirm Add?";
            } else {
              confirmMessage = "Confirm Edit?";
            }

            swal.swalConfirm("Confirm save?", confirmMessage).then((result) => {
              if (result.isConfirmed) {
                //prepare objPayload for post api
                // clone object
                let objPayload = {
                  ...productgroupReducer.currentProductGroupToAdd,
                  name: values.productgroupName,
                  id: values.id,
                };

                // check add or edit
                if (!id) {
                  //add
                  handleAdd({ setSubmitting, objPayload });
                } else {
                  //edit
                  handleEdit({ setSubmitting, objPayload });
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
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Product Group Name"
                    name="productgroupName"
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Field
                    disabled
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="ActiveName"
                    name="ActiveName"
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
              {/* <br></br>
              values :{id} {JSON.stringify(values)}
              <br></br>
              errors :{JSON.stringify(errors)} */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default NewProductGroup;
