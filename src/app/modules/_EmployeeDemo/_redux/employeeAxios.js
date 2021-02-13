// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const EMPLOYEE_URL = `${CONST.API_URL}/Workshop/employee`;

export const addEmployee = (payload) => {
  return axios.post(`${EMPLOYEE_URL}/add`, payload);
};

export const editEmployee = (payload, id) => {
  return axios.put(`${EMPLOYEE_URL}/${id}`, payload);
};

export const deleteEmployee = (id) => {
  return axios.delete(`${EMPLOYEE_URL}/${id}`);
};

export const getEmployee = (id) => {
  return axios.get(`${EMPLOYEE_URL}/${id}`);
};

export const getEmployeeFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  employeeCode,
  firstName,
  lastName
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    employeeCode,
    firstName,
    lastName,
  };
  return axios.get(encodeURLWithParams(`${EMPLOYEE_URL}/filter`, payload));
};
