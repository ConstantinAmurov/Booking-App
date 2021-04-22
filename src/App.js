import React, { useState } from "react";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";

// Add the Firebase products that you want to use
import "firebase/auth";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
            <Route path="/signup" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
