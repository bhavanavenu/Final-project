import React, { Component } from "react";
import api from "../../api";
import utils from "../../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";

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
      <div>
        <div id="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h3>What is it?</h3>
                <p style={{ textAlign: "center" }}>
                  If you need to send a password or some other form of simple
                  but sensitive information to someone you can not send it over
                  IM or email. These methods are not secure as anyone with
                  little knowledge can intercept this information during
                  transmission. Using this as the "middle man" you can safely
                  and securely transfer this data to your recipient.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1>home - upload</h1>
        <button className="button" onClick={this.handleUpdate}>
          Create Document
        </button>
      </div>
    );
  }
}

export default Home;
