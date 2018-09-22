import api from "../../api";
import React, { Component } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: null,
      text: null,
      file: null,
      type: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert("Document created: " + this.state.value);
    event.preventDefault();
  }

  handleUploadFile = event => {
    let newDoc = {};

    // const data = new FormData(); move this to the api function
    // data.append("label", this.state.label);
    // data.append("type", this.state.type);
    // data.append("text", this.state.text);
    // data.append("file", this.state.file);
    // TODO call a method in the api.js file that triggers a route in the backend
    api.postDocuments(newDoc).then(result => {});
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Label
            <input
              type="text"
              value={this.state.label}
              name="label"
              onChange={this.handleChange}
            />
          </label>
          {/* <label>
    Type:
    <input type="text"  value={this.state.type} name="type" onChange={this.handleChange} />
  </label> */}

          <div className="radio">
            <label>
              <input
                type="radio"
                value={this.state.type}
                checked={true}
                onChange={this.handleChange}
              />
              Text
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value={this.state.type}
                onChange={this.handleChange}
              />
              File
            </label>
          </div>
          <label>
            Text
            <input
              type="text"
              value={this.state.text}
              name="text"
              onChange={this.handleChange}
            />
          </label>
          <input type="file" onChange={this.handleUploadFile} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Upload;
