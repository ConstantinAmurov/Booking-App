import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import Register from "./components/Login/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import PublicDashboard from "./components/Public Dashboard/Dashboard";
import Service from "./components/Services/Service";
import Booking from "./components/Dashboard/Booking/Booking";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies, getAllServices } from "./contexts/DatabaseContext";
import { GETCOMPANIES, GETSERVICES } from "./store/actions/actionTypes";
import "bootstrap/dist/css/bootstrap.min.css";
// Add the Firebase products that you want to use
import { auth } from "./Firebase";
import "./css/App.css";

function App(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    const companies = await getCompanies();
    const services = await getAllServices();

    dispatch({ type: GETCOMPANIES, companies: companies });

    dispatch({ type: GETSERVICES, payload: services });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ type: "SIGNSTATE_CHANGED", user: user });
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
          ></PrivateRoute>
          <Route path="/signup" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgot-password" component={ForgotPassword}></Route>
          <PrivateRoute path="/service" component={Service}></PrivateRoute>
          <PrivateRoute path="/booking" component={Booking}></PrivateRoute>
          <Route path="/" component={PublicDashboard}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
