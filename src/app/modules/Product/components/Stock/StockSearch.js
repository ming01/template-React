import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditButton from "../../../Common/components/Buttons/EditButton";
import * as stockRedux from "../../_redux/productRedux";
import { useSelector, useDispatch } from "react-redux";
function StockSearch(props) {
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stock }) => stock);

  const handleEdit = () => {
    const history = props.history;
    props.history.push(`/stock/`);
  };

  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search conditions
        </Typography>

        <Formik
          //Form fields and default values
          initialValues={{
            name: "",
            isactive: true,
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
            let objPayload = {
              ...stockReducer.searchValues,
              name: values.name,
              isactive: values.isactive,
            };
            dispatch(stockRedux.actions.searchStock(objPayload));

            // props.submit(values);
          }}
        >
          {/* Render form */}
          {({ submitForm, isSubmitting, values, errors, resetForm }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="ProductName"
                    name="name"
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                  spacing={3}
                >
                  <Grid item xs={12} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      disabled={isSubmitting}
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Search
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    container
                    direction="row"
                    justify="flex-end"
                  >
                    <EditButton
                      style={{ marginRight: 5 }}
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Edit Product
                    </EditButton>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default StockSearch;
