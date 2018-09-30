import React from "react";
import api from "../../api";
import utils from "../../utils";
import { Route, Link, Switch } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Edit.css";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileUrl: "",
      label: "",
      type: "",
      text: "",
      alert: "",
      value: ""
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let docId = this.props.match.params.id;
    let key = this.props.location.search.substring(5);

    api
      .getDocument(docId)
      .then(doc => {
        this.setState({
          fileUrl: utils.decrypt(doc.fileUrl, key),
          label: utils.decrypt(doc.label, key),
          type: doc.type,
          text: utils.decrypt(doc.text, key)
        });
      })

      .catch(err => console.log(err));

    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      api.deleteDocument(this.props.match.params.id).then(res => {
        setTimeout(alert("Documents were deleted!"), 1000);
        this.props.history.push("/");
      });

      return (ev.returnValue = "Are you sure you want to close?");
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCreateFile() {
    console.log("Calling api to create file!!!");
    api.createFile({ file: this.state.file }).then(res => {
      console.log("File created -->", res);
      this.setState({
        fileUrl: res.fileUrl,
        key: res.key
      });
    });
  }

  handleFile(event) {
    this.setState(
      {
        file: event.target.files[0]
      },
      () => {
        this.handleCreateFile();
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let key = this.props.location.search.substring(5);
    let updates = {
      text: utils.encrypt(this.state.text, key),
      type: this.state.type,
      label: utils.encrypt(this.state.label, key),
      fileUrl: utils.encrypt(this.state.fileUrl, key),
      key: this.state.key
    };
    api.updateDocument(this.props.match.params.id, updates).then(res => {
      setTimeout(() => alert("Generated link copied to clipboard!"), 1000);
      console.log("res", res);
    });
  }

  handleDelete(event) {
    api.deleteDocument(this.props.match.params.id).then(res => {
      setTimeout(alert("Documents were deleted!"), 1000);
      this.props.history.push("/");
    });
  }
  render() {
    if (api.isLoggedIn()) {
      return (
        <div className="container container80 shadow-lg p-5 rounded">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                size="100"
                type="text"
                name="text"
                placeholder="Type your secret here!"
                value={this.state.text}
                onChange={this.handleChange}
              />

              <br />
              {this.state.fileUrl && (
                <span>
                  File uploaded!
                  <br />
                </span>
              )}
            </div>

            <span class="btn btn-warning btn-file">
              File Browse <input type="file" onChange={this.handleFile} />
            </span>

            <CopyToClipboard text={window.location.href}>
              <button type="button" class="btn btn-light" type="submit">
                Generate URL & Copy to Clipboard
              </button>
            </CopyToClipboard>

            <div className="generate-link">
              <Link to="/">Discard this!</Link>
            </div>
          </form>

          <br />
        </div>
      );
    } else {
      return (
        <div className="container container80 shadow-lg p-5 rounded">
          <div className="read-only">
            <div>
              <h5>
                This Document will self destruct! Once accessed you can not view
                this note/file again.
              </h5>
            </div>

            <textarea row="6" size="100" value={this.state.text} />
            <div class="copy-button ">
              <CopyToClipboard text={this.state.text}>
                <button class="btn btn-light">copy text</button>
              </CopyToClipboard>
            </div>

            <div class="download-file">
              <a href={this.state.fileUrl} target="blank">
                <button class="btn btn-warning">Download File</button>
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Edit;
