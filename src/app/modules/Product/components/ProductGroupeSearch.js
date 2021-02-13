import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import AddButton from "../../Common/components/Buttons/AddButton";
function ProductGroupeSearch(props) {
  const handleAdd = () => {
    const history = props.history;
    props.history.push(`/productgroup/new`);
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
            isActive: "",
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
            props.submit(values);
          }}
        >
          {/* Render form */}
          {({ submitForm, isSubmitting, values, errors, resetForm }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="ProductGroupName"
                    name="name"
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="isActive">สถานะ</InputLabel>
                    <Field
                      component={Select}
                      name="isActive"
                      inputProps={{
                        id: "isActive",
                      }}
                    >
                      <MenuItem value={"0"}>ทั้งหมด</MenuItem>
                      <MenuItem value={"true"}>ใช้งาน</MenuItem>
                      <MenuItem value={"false"}>ยกเลิก</MenuItem>
                    </Field>
                  </FormControl>
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
                    <AddButton
                      style={{ marginRight: 5 }}
                      onClick={() => {
                        handleAdd();
                      }}
                    >
                      Add ProductGroup
                    </AddButton>
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

export default ProductGroupeSearch;
