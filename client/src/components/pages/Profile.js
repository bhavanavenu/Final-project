import React, { Component } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      saved_items: {}
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="Home">
        <h2>profile</h2>
        <p>This is a sample project with the MERN stack</p>
      </div>
    );
  }
}

export default Profile;
