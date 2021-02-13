import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as demo from "../app/modules/_Demo/_redux/demoRedux";
import * as employee from "../app/modules/_EmployeeDemo/_redux/employeeRedux";
import * as product from "../app/modules/Product/_redux/productRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  demo: demo.reducer,
  employee: employee.reducer,
  productgroup: product.productgroupreducer,
  product: product.productreducer,
});
