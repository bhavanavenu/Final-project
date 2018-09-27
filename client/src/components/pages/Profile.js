import React, { Component } from "react";
import api from "../../api";
import utils from "../../utils";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user: "",
      documents: []
    };
  }

  render() {
    console.log("user -->", this.state.username);
    if (api.isLoggedIn()) {
      return (
        <div className="Profile">
          <h1>My profile</h1>
          Name : {this.state.username}
          <tbody>
            {this.state.documents.map(c => (
              <tr key={c._id}>
                <td>{c.text}</td>
                <td>{c.label}</td>
                <td>{c.fileUrl}</td>
              </tr>
            ))}
          </tbody>
        </div>
      );
    }
  }
  componentDidMount() {
    api.getProfile().then(res => {
      this.setState({
        user: res.user,
        username: res.user.username,
        documents: res.documents
      });
    });
  }
}

export default Profile;
