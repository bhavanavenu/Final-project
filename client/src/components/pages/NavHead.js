import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import api from "../../api.js";
import "./NavHead.css";

export default class NavHead extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleLogoutClick(e) {
    api.logout();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar className="IronNavbar" dark expand="sm">
        <Container>
          <NavLink className="navbar-brand" to="/">
            {/* <img src="/images/house-outline.png" alt="logo" /> */}
            <h4>Home</h4>
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavLink className={"nav-link"} to="/">
                Home
              </NavLink> */}
              {!api.isLoggedIn() && (
                <NavLink className={"nav-link"} to="/signup">
                  Signup
                </NavLink>
              )}
              {!api.isLoggedIn() && (
                <NavLink className={"nav-link"} to="/login">
                  Login
                </NavLink>
              )}
              {api.isLoggedIn() && (
                <NavLink className={"nav-link"} to="/profile">
                  <h4>What is this?</h4>
                </NavLink>
              )}
              {!api.isLoggedIn() && (
                <Link
                  className={"nav-link"}
                  to="/"
                  onClick={e => this.handleLogoutClick(e)}
                >
                  Logout
                </Link>
              )}
              <NavItem />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
