import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavHead from "./pages/NavHead";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
//mport Upload from "./pages/Upload";
//import api from "../api";
import Edit from "./pages/Edit";
import Updateprofile from "./pages/Updateprofile";
import Footer from "./pages/Footer";
import Faq from "./pages/Faq";
import "./App.css";

import utils from "../utils";

window.utils = utils;

class App extends Component {
  // api.loadUser()

  render() {
    return (
      <div className="App">
        <div className="Nav">
          <NavHead />
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/documents/:id" exact component={Edit} />
            {/* <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} /> */}
            <Route path="/profile" component={Profile} /> */}
            {/* <Route path="/profile/:id/edit" component={Updateprofile} /> */}
            <Route path="/faq" component={Faq} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
