import React, { Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import PrivateRoute from "./modules/Auth/components/PrivateRoute";
import ErrorUnAuthorized from "./modules/Auth/pages/ErrorUnAuthorized";
import DashboardPage from "./pages/DashboardPage";
import TokenHandler from "./modules/Auth/components/TokenHandler";
import { ROLES } from "../Constants";
import Alert from "./modules/_Demo/Alert";
import Test from "./pages/Test";
import ReduxDemo from "./modules/_Demo/pages/ReduxDemo";
import WithTextField from "./modules/_FormikDemo/pages/WithTextField";
import WithCheckboxAndRadio from "./modules/_FormikDemo/pages/WithCheckboxAndRadio";
import WithDropdown from "./modules/_FormikDemo/pages/WithDropdown";
import WithDatePicker from "./modules/_FormikDemo/pages/WithDatePicker";
import NewEmployee from "./modules/_EmployeeDemo/pages/NewEmployee";
import EmployeeList from "./modules/_EmployeeDemo/pages/EmployeeList";
import Product from "./modules/Product/pages/Product";
import ProductGroup from "./modules/Product/pages/ProductGroup";
import ProductGroupList from "./modules/Product/pages/ProductGroupList";
import ProductList from "./modules/Product/pages/ProductList";
import Stock from "./modules/Product/pages/stock/Stock";

export default function BasePage(props) {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute exact path="/dashboard" component={DashboardPage} />

        {/* Start Demo part สามารถ comment ได้ */}
        <ContentRoute exact path="/alert" component={Alert} />
        <ContentRoute exact path="/reduxDemo" component={ReduxDemo} />
        <ContentRoute exact path="/withTextField" component={WithTextField} />
        <ContentRoute
          exact
          path="/withCheckboxAndRadio"
          component={WithCheckboxAndRadio}
        />
        <ContentRoute exact path="/withDropdown" component={WithDropdown} />
        <ContentRoute exact path="/withDatePicker" component={WithDatePicker} />
        <ContentRoute exact path="/employee/" component={EmployeeList} />
        <ContentRoute exact path="/employee/new" component={NewEmployee} />
        <ContentRoute exact path="/employee/edit/:id" component={NewEmployee} />
        <ContentRoute exact path="/product/new" component={Product} />
        <ContentRoute exact path="/employee/" component={EmployeeList} />
        <ContentRoute
          exact
          path="/ProductGroupList/"
          component={ProductGroupList}
        />
        <ContentRoute exact path="/productgroup/new" component={ProductGroup} />
        <ContentRoute
          exact
          path="/productgroup/edit/:id"
          component={ProductGroup}
        />

        <ContentRoute exact path="/ProductList/" component={ProductList} />
        <ContentRoute exact path="/product/edit/:id" component={Product} />
        <ContentRoute exact path="/stock/" component={Stock} />
        <PrivateRoute
          exact
          path="/test"
          roles={[ROLES.admin, ROLES.developer]}
          component={Test}
        />
        {/* End Demo part สามารถ comment ได้ */}

        <Route path="/errorUnAuthorized" component={ErrorUnAuthorized} />

        {/* nothing match - redirect to error */}
        <Redirect to="/error" />
      </Switch>
      <TokenHandler></TokenHandler>
    </Suspense>
  );
}
