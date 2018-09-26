import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div>
        <Link to="/faq">Frequently Asked Questions</Link>
      </div>
    );
  }
}
export default Footer;
