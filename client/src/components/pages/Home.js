import React, { Component } from "react";
import api from "../../api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0
    };
  }
  render() {
    return (
      <div>
        <p>This is a sample project with the MERN stack</p>
      </div>
    );
  }
}

export default Home;