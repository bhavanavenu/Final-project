import React from "react";
import api from "../../api";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileUrl: "",
      label: "",
      type: "",
      text: "",
      alert: ""
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let docId = this.props.match.params.id;

    api
      .getDocument(docId)
      .then(doc => {
        this.setState({
          fileUrl: doc.fileUrl,
          label: doc.label,
          type: doc.type,
          text: doc.text
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
    let updates = { ...this.state };
    api.updateDocument(this.props.match.params.id, updates).then(res => {
      console.log("res", res);
      console.log("res.data", res.data);

      // TODO: save a state.alert
      setTimeout(
        {
          // TODO: remove the state.alert
        },
        2000
      );

      // this.setState({
      //   fileUrl: res.fileUrl,
      //   label: res.label,
      //   type: res.type,
      //   text: res.text
      // });
    });
  }

  handleDelete(event) {
    api.deleteDocument(this.props.match.params.id).then(res => {
      this.props.history.push("/");
    });
  }
  render() {
    console.log(this.props.location.search);
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
          />
          <br />
          is text
          <input
            type="radio"
            name="type"
            value="TEXT"
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
          <button type="submit">Update</button>
          <button onClick={this.handleDelete}>Delete</button>
        </form>
      </div>
    );
  }
}

export default Edit;
