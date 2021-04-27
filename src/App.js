import React, { useState } from "react";

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

import "./css/App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <Route path="/signup" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
            <Route path="/service" component={Service}></Route>
            <Route path="/booking" component={Booking}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
