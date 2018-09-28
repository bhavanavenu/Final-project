import React, { Component } from "react";
import api from "../../api";
import utils from "../../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";
import Footer from "../pages/Footer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    api.postDocuments().then(res => {
      console.log("doc from backend -->", res);
      this.props.history.push(
        `/documents/${res._id}?key=${utils.generateRandomKey()}`
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="container20">
          <div style={{ fontSize: 100 }}>Cipher</div>
          <p>Share secrets anonymously without being watched!</p>

          {/* <h1>home - upload</h1> */}
          <button
            className="button btn btn-warning"
            onClick={this.handleUpdate}
          >
            <span class="glyphicon glyphicon-lock" /> share secret
          </button>

          {/* </div>
        <div className="footer">
          <Footer /> */}
        </div>
      </div>
    );
  }
}

export default Home;
