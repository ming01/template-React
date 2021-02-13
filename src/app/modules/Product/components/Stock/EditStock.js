import * as React from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Dropdown from "../Common/Dropdown";
import * as productAxios from "../../_redux/productAxios";
function EditStock(props) {
  const [dropdowngroup, setDropDownGroup] = React.useState([]);
  const [dropdownproduct, setDropDownProduct] = React.useState([]); //ลองก็แบบ paginated
  const [dropdowndownstockcardtype, setDropDownStockCardType] = React.useState(
    []
  );

  //const [test, setTest] = React.useState([{ id: 0, name: "" }]);
  React.useEffect(() => {
    loaddropdowngroup();
    loaddropdownstockcardtype();
  }, []);

  const AutoCaseCade = () => {
    // Grab values and submitForm from context
    const { values } = useFormikContext();

    React.useEffect(() => {
      if (values.productGroupId !== "") {
        loaddropdownproduct(values);
      }
    }, [values.productGroupId]);

    return null;
  };

  // const allowedState = [
  //   { id: 1, value: "Alabama" },
  //   { id: 2, value: "Georgia" },
  //   { id: 3, value: "Tennessee" },
  // ];

  const loaddropdowngroup = () => {
    debugger;
    productAxios
      .getProductGroup()
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setDropDownGroup(res.data.data);
        } else {
          //internal error
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        alert(err.message);
      });
  };

  const handleChanges = ({ setFieldValue }, e, values) => {
    let qty =
      e.target.value !== "" ? parseInt(e.target.value) + values.currentQty : 0;

    setFieldValue("alterQty", qty);
  };

  const loaddropdownproduct = (values) => {
    productAxios
      .getProductByProductGroupId(values.productGroupId)
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setDropDownProduct(res.data.data);
        } else {
          //internal error
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        alert(err.message);
      });
  };

  const loaddropdownstockcardtype = () => {
    productAxios
      .getStockCardType()
      .then((res) => {
        //bind data
        if (res.data.isSuccess) {
          setDropDownStockCardType(res.data.data);
        } else {
          //internal error
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //physical error
        alert(err.message);
      });
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search conditions
        </Typography>

        <Formik
          //Form fields and default values
          enableReinitialize
          initialValues={{
            productGroupId: "",
            productId: "",
            isActive: "",
            stockCardTypeId: "",
            qty: 0,
            currentQty: 20,
            alterQty: 0,
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
            debugger;
            if (!values.productGroupId || values.productGroupId === "") {
              errors.productGroupId_isError = true;
              errors.productGroupId_errorText = "please select";
            }
            if (!values.productId || values.productId === "") {
              errors.productId_isError = true;
              errors.productId_errorText = "please select";
            }
            if (!values.stockCardTypeId || values.stockCardTypeId === "") {
              errors.stockCardTypeId_isError = true;
              errors.stockCardTypeId_errorText = "please select";
            }
            if (!values.qty || values.qty === 0) {
              errors.qty = "please select";
            }
            return errors;
          }}
          //Form Submission
          // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log(JSON.stringify(values));

            //  props.submit(values);
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
                  <Dropdown
                    values={values.productGroupId}
                    name="productGroupId"
                    label="productGroup"
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    setDropDown={dropdowngroup}
                    dropDownValue="name"
                    dropDownId="id"
                  ></Dropdown>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Dropdown
                    values={values.productId}
                    name="productId"
                    label="product"
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    setDropDown={dropdownproduct}
                    dropDownValue="name"
                    dropDownId="id"
                  ></Dropdown>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Dropdown
                    values={values.productId}
                    name="stockCardTypeId"
                    label="stockCardType"
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    setDropDown={dropdowndownstockcardtype}
                    dropDownValue="name"
                    dropDownId="id"
                  ></Dropdown>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="number"
                    label="จำนวน"
                    name="qty"
                    onChange={(e) => {
                      setFieldValue(e.target.name, e.target.value);
                      handleChanges({ setFieldValue }, e, values);
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="number"
                    label="CurrentQty"
                    name="currentQty"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="number"
                    label="AlterQty"
                    name="alterQty"
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

                {JSON.stringify(values)}
              </Grid>

              <AutoCaseCade></AutoCaseCade>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default EditStock;
