import React, { Component } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    api.postDocuments().then(res => {
      console.log("API document sent back to client -->", res);
      // this.props.history.push(`/documents/${res._id}/?key=word`);
    });
  }

  render() {
    return (
      <div className="Upload">
        {/* <Link to="/:id/edit"> */}
        <button onClick={this.handleUpdate}>Create Document</button>
        {/* </Link> */}
      </div>
    );
  }
}

export default Upload;
