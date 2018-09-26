import React, { Component } from "react";
import api from "../../api";

class Updateprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    api.getProfile(this.props.match.params.id).then(res => {
      this.setState({
        name: res.name,
        email: res.email,
        message: `${this.state.name}', your profile has been edited`
      });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.value]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let updates = { ...this.state };
    api
      .updateProfile(this.props.match.params.id, updates)
      .then(res => {
        this.props.history.push("/profile/");
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="EditProfile">
        <h2>Edit Your Profile</h2>
        <h1>Email</h1>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={e => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default Updateprofile;
