import React, { Component } from "react";
import api from "../../api";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: ""
    };
  }

  render() {
    return (
      <div className="Home">
        <h2>Profile</h2>
        Name : {this.state.name}
        <h1>Sent Documents:</h1>
        <ul>
          <li />
        </ul>
        {/* <Link to={`/profile/`}>Edit</Link> */}
      </div>
    );
  }

  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        name: user.name,
        email: user.email
      });
    });
  }
}
export default Profile;
