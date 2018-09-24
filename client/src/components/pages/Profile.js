import React, { Component } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import NavHead from "./NavHead";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }
  handleChange(e) {
    console.log("handleChange");
    console.log("e.target.value[0]", e.target.value[0]);
    this.setState({
      email: e.target.value
    });
  }

  render() {
    return (
      <div className="Home">
        <h2>Profile</h2>
        {this.state.username}

        <Link to={`/profile/${this.state.email}`}>
          <button type="button" onChange={e => this.handleChange(e)}>
            Edit
          </button>
        </Link>
      </div>
    );
  }

  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        email: user.email
      });
    });
  }
}
export default Profile;
