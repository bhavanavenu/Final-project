import React from "react";
import api from "../../api";

class Edit extends React.Component {
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
  }

  componentDidMount() {
    api.postDocument(this.props.match.params.id).then(res => {
      this.setState({
        file: res.file,
        label: res.label,
        type: res.type,
        text: res.text
      });
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

  handleUserUpdate(event) {
    event.preventDefault();
    let updates = { ...this.state };
    api.updateDocument(this.props.match.params.id, updates).then(res => {
      this.props.history.push("/:id");
    });
  }
  render() {
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
            value="Text"
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
          <button onClick={this.handleUserUpdate}>Update</button>
        </form>
      </div>
    );
  }
}

export default Edit;
