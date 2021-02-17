/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import FormikDropdown from "../components/FormikDropdown";
import * as CONST from "../../../../Constants";
import Axios from "axios";

function WithDropdownCascade(props) {
  const api_get_provoince_url = `${CONST.API_URL}/Workshop/province`;
  const api_get_district_url = `${CONST.API_URL}/Workshop/district/`;
  const api_get_subDistrict_url = `${CONST.API_URL}/Workshop/subdistrict/`;

  const [provinceList, setProvinceList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  const [subDistrictList, setSubDistrictList] = React.useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      provinceId: 1,
      districtId: 2,
      subDistrictId: 4,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const loadProvince = () => {
    //Load Province
    Axios.get(api_get_provoince_url)
      .then((res) => {
        if (res.data.isSuccess) {
          setProvinceList(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const loadDistrict = () => {
    //Load District
    Axios.get(api_get_district_url + formik.values.provinceId)
      .then((res) => {
        if (res.data.isSuccess) {
          setDistrictList(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const loadSubDistrict = () => {
    //Load subDistrict
    Axios.get(api_get_subDistrict_url + formik.values.districtId)
      .then((res) => {
        if (res.data.isSuccess) {
          setSubDistrictList(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  React.useEffect(() => {
    loadProvince();
  }, []);

  React.useEffect(() => {
    loadDistrict();
  }, [formik.values.provinceId]);

  React.useEffect(() => {
    loadSubDistrict();
  }, [formik.values.provinceId, formik.values.districtId]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {/* Province */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="provinceId"
            label="Province"
            data={provinceList}
            firstItemText="Select Province"
            valueFieldName="provinceId"
            displayFieldName="provinceName"
            selectedCallback={() => {
              formik.setFieldValue("districtId", 0).then(() => {
                formik.setFieldValue("subDistrictId", 0);
              });
            }}
          />
        </Grid>

        {/* District */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="districtId"
            label="District"
            data={districtList}
            firstItemText="Select District"
            valueFieldName="districtId"
            displayFieldName="districtName"
            selectedCallback={(val) => {
              formik.setFieldValue("subDistrictId", 0);
            }}
          />
        </Grid>

        {/* SubDistrict */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="subDistrictId"
            label="SubDistrict"
            data={subDistrictList}
            firstItemText="Select SubDistrict"
            valueFieldName="subDistrictId"
            displayFieldName="subDistrictName"
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
    </form>
  );
}

export default WithDropdownCascade;
