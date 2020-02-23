import React, { useEffect } from "react";
import "./App.css";
import Login from "../auth/Login";
import { LoginPrivateRoute, DashboardPrivateRoute } from "../PrivateRoute";
import { Switch } from "react-router";
import Dashboard from "../Dashboard/Dashboard";
import { connect } from "react-redux";
import { setUser } from "../../actions";
import jwt from "jsonwebtoken";

function App(props) {
  /**
   * @function useEffect - used to decode token and set user in redux store
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      props.setUser(jwt.decode(token).user);
    }
  });

  return (
    <Switch>
      <LoginPrivateRoute component={Login} exact path="/" />
      <DashboardPrivateRoute component={Dashboard} exact path="/dashboard" />
    </Switch>
  );
}

export default connect(null, { setUser })(App);
