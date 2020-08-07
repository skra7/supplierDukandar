import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  // eslint-disable-next-line no-unused-expressions
  <Route
    {...rest}
    render={(props) => 
      localStorage.getItem("login") ? (
        <Component {...props} {...rest}/>
      ) : (
        <Redirect
          to="/login"
        />
      )
    }
  />
)