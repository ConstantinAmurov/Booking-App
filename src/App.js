import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import Register from "./components/Login/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import PublicDashboard from "./components/Public Dashboard/Dashboard";
import Service from "./components/Services/Service";
import Booking from "./components/Dashboard/Booking/Booking";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllServices } from "./contexts/DatabaseContext";
import { GETSERVICES } from "./store/actions/actionTypes";
import { isLoaded, isEmpty } from "react-redux-firebase";

import "bootstrap/dist/css/bootstrap.min.css";
// Add the Firebase products that you want to use
import { auth } from "./Firebase";
import "./css/App.css";

function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  useEffect(async () => {
    const services = await getAllServices();

    dispatch({ type: GETSERVICES, payload: services });
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/signup" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgot-password" component={ForgotPassword}></Route>
          <PrivateRoute path="/service">
            <Service></Service>
          </PrivateRoute>
          <PrivateRoute path="/booking">
            <Booking></Booking>
          </PrivateRoute>
          <Route exact path="/" component={PublicDashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
