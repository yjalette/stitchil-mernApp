import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';

import SignOutLinks from './SignOutLinks';
import SignInLinks from './SignInLinks';
import AuthContext from '../../context/Auth-context';
import FilterByKeywords from '../filter/FilterByKeywords';
import "./style.css";

const MainNav = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const customClass = pathname === "/" || pathname.includes("explore") ? "main-nav-dark" : "main-nav-light"
  return (
    <AuthContext.Consumer>
      {context => {
        return (
          <Navbar collapseOnSelect expand="sm" className={`main-nav flex-center ${customClass}`}>
            <Nav className="main-nav__menu">
              {/* <Navbar.Brand href="/" to="/">
                <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602104662/logo/logo_jr1las.svg" alt="logo" className="logo" />
              </Navbar.Brand> */}
              <Nav.Link href="/" className="main-menu__link link-home">home</Nav.Link>
              <Nav.Link href="/explore" className="main-menu__link link-explore">explore</Nav.Link>
              <FilterByKeywords />
            </Nav>
            {context && context.user ? <SignInLinks username={context.user.username} user={context.user} /> : <SignOutLinks />}
          </Navbar>
        )
      }}

    </AuthContext.Consumer>
  )
}





export default MainNav;