/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import * as authCrud from "../_redux/authCrud";
import * as authAction from "../_redux/authRedux";
import { useDispatch } from "react-redux";
var dayjs = require("dayjs");

function TokenHandler(props) {
  const dispatch = useDispatch();
  const [timeToRenew, setTimeToRenew] = useState(dayjs());
  const minute_before_exp_to_renew = 1;

  React.useEffect(() => {
    // catch local storage event from other page
    // log out listener
    window.addEventListener("storage", (e) => {
      //get local storage 'token'
      let authLocalStorage = JSON.parse(localStorage.getItem("persist:auth"));
      if (authLocalStorage.authToken === "null") {
        dispatch(authAction.actions.logout());
      }
    });

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      if (dayjs().isAfter(timeToRenew)) {
        renew();
      }
      //recheck expired token every 30 seconds
    }, 30000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeToRenew]);

  React.useEffect(() => {
    renew();
  }, []);

  const renew = () => {
    authCrud
      .renewToken()
      .then((res) => {
        if (res.data.isSuccess) {
          updateState(res.data.data);
        } else {
          alert(res.data.message);
          dispatch(authAction.actions.logout());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(authAction.actions.logout());
      });
  };

  const updateState = (token) => {
    let loginDetail = {};

    //get token
    loginDetail.authToken = token;

    //get user
    loginDetail.user = authCrud.getUserByToken(token);

    // get exp
    let exp = authCrud.getExp(token);
    loginDetail.exp = exp;

    //get roles
    loginDetail.roles = authCrud.getRoles(token);

    dispatch(authAction.actions.renewToken(loginDetail));
    console.log("renew");

    //set time to renew
    setTimeToRenew(exp.add(minute_before_exp_to_renew * -1, "minute"));
  };

  return (
    <div style={{ display: "none" }}></div>
    // <div>
    //   {JSON.stringify(authReducer)}
    //   <br></br>
    //   <button onClick={renew}>Renew!</button>
    // </div>
  );
}

export default TokenHandler;
