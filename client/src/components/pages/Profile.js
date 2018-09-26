import React, { Component } from "react";
import api from "../../api";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user: ""
    };
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="Profile">
        <h1>My profile</h1>
        Name : {this.state.user.username}
        <br />
        <button>Sent Documents</button>
        <br />
      </div>
    );
  }
  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        user: user
      });
    });
  }
}

export default Profile;
