/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import EmployeePage1 from "../components/EmployeePage1";
import EmployeePage2 from "../components/EmployeePage2";
import EmployeePage3 from "../components/EmployeePage3";
import EmployeePage4 from "../components/EmployeePage4";
import { useParams } from "react-router-dom";
import * as employeeAxios from '../_redux/employeeAxios';
import * as employeeRedux from '../_redux/employeeRedux';
import * as swal from '../../Common/components/SweetAlert';
import * as commonFunctions from '../../Common/functions/CommonFunctions'
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function NewEmployee(props) {
  const classes = useStyles();
  const employeeReducer = useSelector(({ employee }) => employee);
  const [steps] = React.useState([
    "Page1",
    "Page2",
    "Page3",
    "Page4",
  ]);

  let {id} = useParams();

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (id) {
      //edit
      //get employee from api
      employeeAxios
        .getEmployee(id)
        .then(async (res) => {
          if (res.data.isSuccess) {
            console.log(JSON.stringify(res.data.data));
            let apiData = res.data.data

            // get province district subDistrict
            let provinceObject = await commonFunctions.getSubDistrictDetail(apiData.subDistrict.subDistrictId)
            
            // clone & update value
            let objPayload = {
              ...employeeReducer.currentEmployeeToAdd,
              titleId: apiData.title.titleId,
              employeeCode: apiData.employeeCode,
              firstName: apiData.firstName,
              lastName: apiData.lastName,
              identityCardNo: apiData.identityCardNo,
              dateOfBirth: dayjs(apiData.dateOfBirth),
              address1: apiData.address1,
              address2: apiData.address2,
              subDistrictId: apiData.subDistrict.subDistrictId,
              postCode: apiData.postCode,
              genderId: apiData.gender.genderId.toString(),
              hobbies: apiData.hobbies.map((obj) => obj.hobbyId),
              isActive: apiData.isActive,
              employee_provinceId: provinceObject.provinceId,
              employee_districtId: provinceObject.districtId,
              employee_subDistrictId: provinceObject.subDistrictId,
            };

            // save to redux
            dispatch(employeeRedux.actions.updateCurrentEmployee(objPayload));
          } else {
            swal.swalError("Error", res.data.message);
          }
        })
        .catch((err) => {
          swal.swalError("Error", err.message);
        });
    }
    return () => {
      //reset redux state
      dispatch(employeeRedux.actions.resetCurrentEmployee())
    }
  }, [id]);



  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <EmployeePage1 history={props.history}></EmployeePage1>
          </div>
        );
      case 1:
        return (
          <div>
            <EmployeePage2 history={props.history}></EmployeePage2>
          </div>
        );
      case 2:
        return (
          <div>
            <EmployeePage3 history={props.history}></EmployeePage3>
          </div>
        );
      case 3:
        return (
          <div>
            <EmployeePage4 history={props.history}></EmployeePage4>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={employeeReducer.currentPage}>
        {steps.map((item) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={item} {...stepProps}>
              <StepLabel {...labelProps}>{item}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Paper elevation={3} style={{ padding: 20, marginTop: 10 }}>
        {getStepContent(employeeReducer.currentPage)}
      </Paper>
      {id}
    </div>
  );
}

export default NewEmployee;
