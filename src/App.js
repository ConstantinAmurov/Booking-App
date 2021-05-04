import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import Register from "./components/Login/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Service from "./components/Dashboard/Service";
import Booking from "./components/Dashboard/Booking";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
// Add the Firebase products that you want to use
import { auth } from "./Firebase";
import "./css/App.css";
import { useDispatch, useSelector } from "react-redux";
import store from "./store/app";
import { SIGNSTATE_CHANGED } from "./store/actions/actionTypes";

function App(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ type: "SIGNSTATE_CHANGED", user: user });
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
          <Route path="/signup" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgot-password" component={ForgotPassword}></Route>
          <Route path="/service" component={Service}></Route>
          <Route path="/booking" component={Booking}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
