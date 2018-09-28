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
      // console.log("Closing the window and deleteing the file and the document");
      // //call deleteDocument to delete from mongodb.
      // console.log("Calling api to delete file in S3!!!");
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
          {/* <h1>Document Edit</h1> */}
          <form onSubmit={this.handleSubmit}>
            {/* <div className="form-group">
              <label>Label</label>
              <input
                className="form-control"
                id="text"
                type="text"
                className="form-control"
                name="label"
                value={this.state.label}
                onChange={this.handleChange}
              />
            </div> */}
            {/* <div className="form-group form-check">
              <label>File</label>
              <input
                type="radio"
                name="type"
                value="FILE"
                onChange={this.handleChange}
                selected={this.state.type === "FILE" ? true : false}
              />
              <br />
              <label>Text</label>
              <input
                type="radio"
                name="type"
                value="TEXT"
                onChange={this.handleChange}
                selected={this.state.type === "TEXT" ? true : false}
              />
            </div> */}
            {/* (if({this.state.type==="TEXT"}){ */}
            <div className="form-group">
              {/* <label>T</label> */}

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
                  {/* Your file: {this.state.fileUrl} */} File uploaded!
                  <br />
                </span>
              )}
            </div>

            {/* <label>File Upload</label>
            <input type="file" onChange={this.handleFile} /> */}

            <span class="btn btn-warning btn-file">
              File Browse <input type="file" onChange={this.handleFile} />
            </span>

            <CopyToClipboard text={window.location.href}>
              <button type="button" class="btn btn-light" type="submit">
                Generate URL & Copy to Clipboard
              </button>
            </CopyToClipboard>
            {/* <button className="btn btn-primary" type="submit">
              Upload
            </button> */}
            {/* <button onClick={this.handleDelete}>Delete</button> */}

            <div className="generate-link">
              <Link to="/">Discard this!</Link>
            </div>
          </form>

          <br />
          {/* <CopyToClipboard text={window.location.href}>
            <button>Copy URL to the clipboard</button>
          </CopyToClipboard> */}
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
            {/* <h5>
            Label:
            {this.state.label}
          </h5> */}

            {/* <h5>text: {this.state.text}</h5> */}

            <textarea row="6" size="100" value={this.state.text} />
            <div class="copy-button ">
              <CopyToClipboard text={this.state.text}>
                <button class="btn btn-light">copy text</button>
              </CopyToClipboard>
            </div>

            {/* <div className="form-group">
              <textarea rows="5" size="100" value={this.state.text} />
            </div> */}

            {/* <h5>File :{this.state.fileUrl}</h5> */}

            <div class="download-file">
              <a href={this.state.fileUrl} target="blank">
                <button class="btn btn-warning">Download File</button>
              </a>
            </div>
          </div>
        </div>

        // <div className="read-only">
        //   <div>
        //     <h5>
        //       This Document will self destruct! Once accessed you can not view
        //       this note/file again.
        //     </h5>
        //   </div>
        //   {/* <h5>
        //     Label:
        //     {this.state.label}
        //   </h5> */}

        //   {/* <h5>text: {this.state.text}</h5> */}
        //   {/* <div class="client-text center-text">
        //     <div class="copy-button ">
        //       <CopyToClipboard text={this.state.text}>
        //         <button class="btn btn-light">copy text</button>
        //       </CopyToClipboard>
        //     </div>
        //     <div class="txt-area ">
        //       <textarea size="500" row="10" value={this.state.text} />
        //     </div>
        //   </div> */}

        //   <div className="form-group">
        //     <textarea rows="9" size="300" value={this.state.text} />
        //   </div>

        //   {/* <h5>File :{this.state.fileUrl}</h5> */}

        //   <div class="download-file">
        //     <a href={this.state.fileUrl} target="blank">
        //       <button class="btn btn-warning">Download File</button>
        //     </a>
        //   </div>
        // </div>
      );
    }
  }
}

export default Edit;
