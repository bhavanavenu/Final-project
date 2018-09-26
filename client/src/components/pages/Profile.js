import React, { Component } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: null
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
        Name : {this.state.name}
        <h1>Sent Documents:</h1>
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
