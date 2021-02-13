import * as React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as swal from "../../Common/components/SweetAlert";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as productRedux from "../_redux/productRedux";
import * as productAxios from "../_redux/productAxios";
import DropdownGroup from "../components/DropdownProductGroup";

function NewProduct(props) {
  const handleAdd = ({ setSubmitting, objPayload }) => {
    //console.log(JSON.stringify(objPayload));
    // alert(objPayload.name);
    //connect api
    debugger;
    productAxios
      .addProduct(objPayload)
      .then((res) => {
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Add Completed", `Add id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetProduct());
              props.history.push("/ProductList/");
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
    productAxios
      .editProduct(objPayload)
      .then((res) => {
        debugger;
        if (res.data.isSuccess) {
          //Success
          swal
            .swalSuccess("Edit Completed", `Edit id: ${res.data.data.id}`)
            .then(() => {
              dispatch(productRedux.actions.resetProductGroup());
              props.history.push("/ProductList/");
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
  const dispatch = useDispatch();
  const productReducer = useSelector(({ product }) => product);
  let { id } = useParams();

  React.useEffect(() => {
    //load data from api
    return () => {
      dispatch(productRedux.actions.resetProduct());
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
            productName: productReducer.currentProductToAdd.name,
            id: productReducer.currentProductToAdd.id,
            IsActive: productReducer.currentProductToAdd.isActive,
            price: productReducer.currentProductToAdd.price,
            qty: productReducer.currentProductToAdd.qty,
            productGroupId: productReducer.currentProductToAdd.productGroupId,
            ActiveName: productReducer.currentProductToAdd.isActive
              ? "ใช้งาน"
              : "ยกเลิก",
          }}
          //Validation section
          validate={(values) => {
            const errors = {};

            if (!values.productName) {
              errors.productName = "Required ProductGroupName";
            }
            if (!values.price) {
              errors.price = "Required Price";
            }
            if (!values.qty) {
              errors.qty = "Required Qty";
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
                  ...productReducer.currentProductToAdd,
                  name: values.productName,
                  id: values.id,
                  price: values.price,
                  qty: values.qty,
                  productGroupId: values.productGroupId,
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
          {({ submitForm, isSubmitting, values, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Product Name"
                    name="productName"
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

                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="number"
                    label="ราคา"
                    name="price"
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="number"
                    label="จำนวน"
                    name="qty"
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <DropdownGroup
                    values={values}
                    name="productGroupId"
                    label="productGroup"
                  ></DropdownGroup>
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

export default NewProduct;
