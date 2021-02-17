// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.LOCAL_URL}/Product`;

export const addProductGroup = (payload) => {
  return axios.post(`${PRODUCT_URL}/addproductgroups`, payload);
};

export const editProductGroup = (payload) => {
  return axios.put(`${PRODUCT_URL}/editproductgroups`, payload);
};

export const getProductGroup = () => {
  return axios.get(`${PRODUCT_URL}/getallproductgroups`);
};

export const getProductGroupid = (id) => {
  return axios.get(`${PRODUCT_URL}/getproductgroupByid/${id}`);
};

export const getProductGroupFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  Name,
  IsActive
) => {
  debugger;
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    Name,
    IsActive,
  };
  return axios.get(
    encodeURLWithParams(`${PRODUCT_URL}/productgroups/filter`, payload)
  );
};

export const getProduct = () => {
  return axios.get(`${PRODUCT_URL}/getallproducts`);
};
export const getProductid = (id) => {
  return axios.get(`${PRODUCT_URL}/getproductByid/${id}`);
};

export const getProductByProductGroupId = (id) => {
  return axios.get(`${PRODUCT_URL}/productrbyproductgroupid/${id}`);
};

export const addProduct = (payload) => {
  return axios.post(`${PRODUCT_URL}/addproductrs`, payload);
};

export const editProduct = (payload) => {
  debugger;
  return axios.put(`${PRODUCT_URL}/editproduct`, payload);
};

export const getProductFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  Name,
  IsActive,
  productGroupId
) => {
  debugger;
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    Name,
    IsActive,
    productGroupId,
  };
  return axios.get(
    encodeURLWithParams(`${PRODUCT_URL}/products/filter`, payload)
  );
};

const STOCK_URL = `${CONST.LOCAL_URL}/Stock`;
export const getStockCardType = () => {
  return axios.get(`${STOCK_URL}/stockcardtype`);
};

export const addStock = (payload) => {
  return axios.post(`${STOCK_URL}/addstockcard`, payload);
};

export const getStockFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  Name,
  IsActive
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    Name,
    IsActive,
  };
  return axios.get(
    encodeURLWithParams(`${STOCK_URL}/stockcard/filter`, payload)
  );
};
