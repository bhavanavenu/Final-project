import React, { Component } from "react";
import api from "../../api";
import NavHead from "../pages/NavHead";
import Upload from "../pages/Upload";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0
    };
  }
  render() {
    return (
      <div>
        <h1>home - upload</h1>
        <Upload />
      </div>
    );
  }
}

export default Home;
