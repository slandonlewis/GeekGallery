import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import "../nav.css"

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar-div'>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="navtitle" tag={RRNavLink} to="/">GeekGallery</NavbarBrand>
        {/* <NavbarToggler onClick={toggle} /> */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {/* {isLoggedIn &&
              <NavItem>
                <NavLink className='navitem' tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
            } */}
          </Nav>
          <Nav navbar className='navbar-items'>
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink className='navitem' tag={RRNavLink} to="/discover">Discover</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='navitem' tag={RRNavLink} to="/gallery">My Gallery</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='navitem' tag={RRNavLink} to="/inspiration">Find Inspiration</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='navitem' tag={RRNavLink} to="/create">Share</NavLink>
                </NavItem>
                <NavItem>
                  <a aria-current="page" className="nav-link navitem"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink className='navitem' tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='navitem' tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
