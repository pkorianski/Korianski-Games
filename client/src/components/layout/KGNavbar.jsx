import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const KGNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar fixed="top" sticky="top" color="dark" light expand="xl">
        <NavbarBrand
          style={{ color: "white" }}
          className="navbar-brand"
          href="/"
        >
          KORIANSKI <br /> GAMES
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: "white" }} nav caret>
                OUR GAMES
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/palace">Palace</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

KGNavbar.propTypes = {};

export default KGNavbar;
