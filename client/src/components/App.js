import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavHead from "./pages/NavHead";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import api from "../api";
import Edit from "./pages/Edit";
import Updateprofile from "./pages/Updateprofile";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "./App.css";

import utils from "../utils";

window.utils = utils;

class App extends Component {
  // api.loadUser()

  render() {
    return (
      <div className="App">
        <NavHead />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/documents/:id" exact component={Edit} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile/edit" component={Updateprofile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
