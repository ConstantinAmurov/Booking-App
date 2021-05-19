import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = useSelector((state) => state.user.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser != null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    ></Route>
  );
}
