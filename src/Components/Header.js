import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText } from "reactstrap";
import { Typewriter} from "react-simple-typewriter";
export default class Mainpage extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" container dark expand fixed="top" light>
          <NavbarBrand href="/">
            <Typewriter words={["[AdultSwim]"] } typeSpeed="60" />
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/location/">Locations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/character/">Characters</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/episode/">Episodes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/karyaboyraz">GitHub</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Karya Boyraz</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
