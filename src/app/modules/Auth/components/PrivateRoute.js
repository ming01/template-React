import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, roles, ...rest }) {
  const authReducer = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        roles = roles === undefined ? [] : roles;

        if (roles.length > 0) {
          // check if route is restricted by role
          let intersection = roles.filter((x) => authReducer.roles.includes(x));
          if (intersection.length === 0) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: "/errorUnAuthorized" }} />;
          }
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
