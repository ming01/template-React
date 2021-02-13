/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import Axios from "axios";
import * as CONST from "../../../../Constants";

function CaseCade(props) {
  const [provinceList, setProvinceList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  const [subDistrictList, setSubDistrictList] = React.useState([]);

  const api_get_provoince_url = `${CONST.API_URL}/Workshop/province`;
  const api_get_district_url = `${CONST.API_URL}/Workshop/district/`;
  const api_get_subDistrict_url = `${CONST.API_URL}/Workshop/subdistrict/`;

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    //Load District
    let provinceId = props.values[`${props.name}_provinceId`];
    if (provinceId) {
      Axios.get(api_get_district_url + provinceId)
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
    }
  }, [props.values[`${props.name}_provinceId`]]);

  React.useEffect(() => {
    //Load subDistrict
    let districtId = props.values[`${props.name}_districtId`];
    if (districtId) {
      Axios.get(api_get_subDistrict_url + districtId)
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
    }
  }, [
    props.values[`${props.name}_provinceId`],
    props.values[`${props.name}_districtId`],
  ]);

  return (
    <Grid container spacing={3}>
      {/* Start Province */}
      <Grid item xs={12} lg={4}>
        <FormControl
          fullWidth
          error={
            props.errors[`${props.name}_provinceId_isError`] &&
            props.touched[`${props.name}_provinceId`]
          }
        >
          <InputLabel htmlFor="province">จังหวัด</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_provinceId`}
            inputProps={{
              id: "provinceId",
            }}
            onChange={(event) => {
              props
                .setFieldValue(event.target.name, event.target.value)
                .then(() => {
                  // reset selected district
                  props
                    .setFieldValue(`${props.name}_districtId`, 0)
                    .then(() => {
                      // reset selected subDistrict
                      props.setFieldValue(`${props.name}_subDistrictId`, 0);
                    });
                });
            }}
          >
            <MenuItem disabled value={0}>
              กรุณาเลือก
            </MenuItem>
            {provinceList.map((item) => (
              <MenuItem
                key={`${props.name}_p_${item.provinceId}`}
                value={item.provinceId}
              >
                {item.provinceName}
              </MenuItem>
            ))}
          </Field>
          {props.errors[`${props.name}_provinceId_isError`] &&
            props.touched[`${props.name}_provinceId`] && (
              <FormHelperText>
                {props.errors[`${props.name}_provinceId_errorText`]}
              </FormHelperText>
            )}
        </FormControl>
      </Grid>
      {/* End Province */}

      {/* Start District */}
      <Grid item xs={12} lg={4}>
        <FormControl
          fullWidth
          error={
            props.errors[`${props.name}_districtId_isError`] &&
            props.touched[`${props.name}_districtId`]
          }
        >
          <InputLabel htmlFor="district">อำเภอ</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_districtId`}
            inputProps={{
              id: "districtId",
            }}
            onChange={(event) => {
              props
                .setFieldValue(event.target.name, event.target.value)
                .then(() => {
                  // reset selected subDistrict
                  props.setFieldValue(`${props.name}_subDistrictId`, 0);
                });
            }}
          >
            <MenuItem disabled value={0}>
              กรุณาเลือก
            </MenuItem>
            {districtList.map((item) => (
              <MenuItem
                key={`${props.name}_d_${item.districtId}`}
                value={item.districtId}
              >
                {item.districtName}
              </MenuItem>
            ))}
          </Field>
          {props.errors[`${props.name}_districtId_isError`] &&
            props.touched[`${props.name}_districtId`] && (
              <FormHelperText>
                {props.errors[`${props.name}_districtId_errorText`]}
              </FormHelperText>
            )}
        </FormControl>
      </Grid>
      {/* End District */}

      {/* Start subDistrict */}
      <Grid item xs={12} lg={4}>
        <FormControl
          fullWidth
          error={
            props.errors[`${props.name}_subDistrictId_isError`] &&
            props.touched[`${props.name}_subDistrictId`]
          }
        >
          <InputLabel htmlFor="subDistrict">ตำบล</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_subDistrictId`}
            inputProps={{
              id: "subDistrictId",
            }}
          >
            <MenuItem disabled value={0}>
              กรุณาเลือก
            </MenuItem>
            {subDistrictList.map((item) => (
              <MenuItem
                key={`${props.name}_sd_${item.subDistrictId}`}
                value={item.subDistrictId}
              >
                {item.subDistrictName}
              </MenuItem>
            ))}
          </Field>
          {props.errors[`${props.name}_subDistrictId_isError`] &&
            props.touched[`${props.name}_subDistrictId`] && (
              <FormHelperText>
                {props.errors[`${props.name}_subDistrictId_errorText`]}
              </FormHelperText>
            )}
        </FormControl>
      </Grid>
      {/* End District */}
    </Grid>
  );
}

export default CaseCade;
