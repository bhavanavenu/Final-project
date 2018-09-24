import api from "../../api";
import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      label: "",
      type: "",
      text: ""
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }
  // fileSelectedHandler = event => {
  //   console.log("debug");
  //   debugger;
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     selectedLabel: event.target.value,
  //     selectedType: event.target.value,
  //     selectedText: event.target.value
  //   });
  // };
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFile(event) {
    // debugger;
    this.setState({
      file: event.target.files[0]
    });
    // api.postDocuments(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submit form");
  }

  render() {
    return (
      <div className="Upload">
        <form onSubmit={this.handleSubmit}>
          <label>Label</label>
          <input
            id="text"
            type="text"
            name="label"
            value={this.state.label}
            onChange={this.handleChange}
          />
          <br />
          is file
          <input
            type="radio"
            name="type"
            value="TEXT"
            onChange={this.handleChange}
          />
          <br />
          is text
          <input
            type="radio"
            name="type"
            value="FILE"
            onChange={this.handleChange}
          />
          <br />
          Text
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <br />
          File
          <input type="file" onChange={this.handleFile} />
          <br />
          <button onClick={this.fileUploadHandler}>Create Document</button>
        </form>
      </div>
    );
  }
}

export default Upload;
