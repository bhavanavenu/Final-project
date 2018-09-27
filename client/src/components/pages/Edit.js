import React from "react";
import api from "../../api";
import utils from "../../utils";
import { Route, Link, Switch } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
      console.log("Closing the window and deleteing the file and the document");
      //call deleteDocument to delete from mongodb.
      console.log("Calling api to delete file in S3!!!");
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

  // handleCreateFile() {
  //   console.log("Calling api to crate file!!!");
  //   api.createFile({ file: this.state.file }).then(res => {
  //     console.log("File created -->", res);
  //     this.setState({
  //       fileUrl: res.fileUrl,
  //       key: res.key
  //     });
  //   });
  // }

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
    // if (this.state.type === "TEXT")
    let key = this.props.location.search.substring(5);
    let updates = {
      text: utils.encrypt(this.state.text, key),
      type: this.state.type,
      label: utils.encrypt(this.state.label, key),
      fileUrl: utils.encrypt(this.state.fileUrl, key),
      key: this.state.key
    };
    api.updateDocument(this.props.match.params.id, updates).then(res => {
      setTimeout(() => alert("Documents were created!"), 1000);
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
        <div className="container">
          <h1>Document Edit</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <label>Label</label>
              </div>
              <div className="col-sm-8">
                <input
                  id="text"
                  type="text"
                  className="form-control"
                  name="label"
                  value={this.state.label}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <br />
            is file
            <input
              type="radio"
              name="type"
              value="FILE"
              onChange={this.handleChange}
              selected={this.state.type === "FILE" ? true : false}
            />
            <br />
            is text
            <input
              type="radio"
              name="type"
              value="TEXT"
              onChange={this.handleChange}
              selected={this.state.type === "TEXT" ? true : false}
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
            {this.state.fileUrl && (
              <span>
                Your file: {this.state.fileUrl}
                <br />
              </span>
            )}
            File
            <input type="file" onChange={this.handleFile} />
            <br />
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
            {/* <button onClick={this.handleDelete}>Delete</button> */}
            <span>
              <Link to="/">Generate new</Link>
            </span>
          </form>
          <div>
            <br />
            <CopyToClipboard text={window.location.href}>
              <button>Copy URL to the clipboard</button>
            </CopyToClipboard>
          </div>
        </div>
      );
    } else {
      return (
        <div className="read-only">
          <h2>
            This Document will self destruct! Once viewed you can not view this
            note again. If you need access to this information again please copy
            it to a secure location.
          </h2>
          <h5>
            Label:
            {this.state.label}
          </h5>
          <h5>Text : {this.state.text}</h5>

          <h5>File :{this.state.fileUrl}</h5>
          <a href={this.state.fileUrl} target="blank">
            {this.state.fileUrl}
          </a>
        </div>
      );
    }
  }
}

export default Edit;
