import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavHead from "./pages/NavHead";
import Edit from "./pages/Edit";
import "./App.css";
import Faq from "./pages/Faq";
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
            <Route path="/faq" component={Faq} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
