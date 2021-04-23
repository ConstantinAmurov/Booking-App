import React, { useState } from "react";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
// Add the Firebase products that you want to use

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            debugger;
            <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <Route path="/signup" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
