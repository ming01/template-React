import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { Redirect } from "react-router-dom";

function Logout() {
  React.useEffect(() => {
    dispatch(auth.actions.logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const authReducer = useSelector(({ auth }) => auth);
  return (
    <div>
      {Boolean(authReducer.authToken) ? (
        <LayoutSplashScreen />
      ) : (
        <Redirect to="/auth/login" />
      )}
    </div>
  );
}

export default Logout;
