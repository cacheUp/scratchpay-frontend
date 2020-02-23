import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * @function LoginPrivateRoute - function that checks if theres a token, if there is it will redirect to dashboard
 * @param {Component} component - component that is passed to be a private route
 * @param {Object} props - props to be spread into passed in component
 */

export const LoginPrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={renderProps => {
        if (localStorage.getItem("token")) return <Redirect to="/dashboard" />;
        return <Component {...renderProps} />;
      }}
    />
  );
};

/**
 * @function DashboardPrivateRoute - function that checks if theres a token, if not there is it will redirect to login
 * @param {Component} component - component that is passed to be a private route
 * @param {Object} props - props to be spread into passed in component
 */

export const DashboardPrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={renderProps => {
        if (!localStorage.getItem("token")) return <Redirect to="/" />;
        return <Component {...renderProps} />;
      }}
    />
  );
};
