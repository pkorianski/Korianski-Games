import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

const KGNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownToggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Navbar fixed="top" sticky="top" color="dark" light expand="md">
        <NavbarBrand
          style={{ color: "white" }}
          className="navbar-brand"
          href="/"
        >
          KORIANSKI <br /> GAMES
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="nav-item">
              <NavLink href="/" style={{ color: "white" }}>
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about" style={{ color: "white" }}>
                ABOUT US
              </NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={dropdownToggle}>
              <DropdownToggle style={{ color: "white" }} nav caret>
                PLAY
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/palace">Palace</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
          <NavbarText className="navbar-text" style={{ color: "white" }}>
            NEW USER?
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

KGNavbar.propTypes = {};

export default KGNavbar;
