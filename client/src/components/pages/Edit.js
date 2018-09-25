import React from "react";
import api from "../../api";
import utils from "../../utils";

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
      // api.updateDocument(this.props.match.params.id).then(res => {
      //   console.log("Document from db -->", res);
      //   this.setState({
      //     file: res.file,
      //     label: res.label,
      //     type: res.type,
      //     text: res.text

      //   });
      // });
      .catch(err => console.log(err));

    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      console.log("TODO: delete");
      return (ev.returnValue = "Are you sure you want to close?");
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFile(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // if (this.state.type === "TEXT")
    let key = this.props.location.search.substring(5);
    let encryptedText = utils.encrypt(this.state.text, key);
    let encryptedLabel = utils.encrypt(this.state.label, key);

    console.log(encryptedText);
    let updates = {
      text: encryptedText,
      type: this.state.type,
      label: encryptedLabel,
      file: this.state.file
    };
    api.updateDocument(this.props.match.params.id, updates).then(res => {
      setTimeout(() => alert("Documents were created!"), 1000);
      console.log("res", res);
      console.log("res.data", res.data);

      // TODO: save a state.alert
      // setTimeout(
      //   {
      //     // TODO: remove the state.alert
      //   },
      //   2000
      // );
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
        <div>
          <h1>Document Edit</h1>
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
            File
            <input type="file" onChange={this.handleFile} />
            <br />
            <button type="submit">Update</button>
            <button onClick={this.handleDelete}>Delete</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="read-only">
          <h2>{this.state.label}</h2>
          <p>{this.state.text}</p>
          <p>{this.state.fileUrl}</p>
        </div>
      );
    }
  }
}

export default Edit;
