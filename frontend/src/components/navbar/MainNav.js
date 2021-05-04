import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import "./style.css";
import SignOutLinks from './SignOutLinks';
import SignInLinks from './SignInLinks';
import AuthContext from '../../context/Auth-context';
import FilterByKeywords from '../filter/FilterByKeywords';
import CustomButton from '../../layout/button/CustomButton';
import { useToggle } from '../../custom_hooks/useToggle';

const MainNav = () => {
  const [openUserNav, toggleUserNav] = useToggle(false);
  const { pathname } = useLocation();
  const customClass = pathname === "/" || pathname.includes("explore") ? "mainNav-dark" : "mainNav-light";
  const respMenuClass = `mainNav-user-resp-btn ${openUserNav ? "btn-icon-text fas fa-window-close" : "btn-icon hide"}`
  return (
    <AuthContext.Consumer>
      {({ user }) => {
        return (
          <Navbar collapseOnSelect expand="sm" className={`mainNav ${customClass}`}>
            {!openUserNav && <Nav className="mainNav-general">
              <Nav.Link href="/" className="link-home">home</Nav.Link>
              <Nav.Link href="/explore" className="link-explore">explore</Nav.Link>
              {/* <FilterByKeywords /> */}
            </Nav>}
            <Nav className={`mainNav-user ${openUserNav ? "open" : "hide"}`}>
              {user ?
                <SignInLinks username={user.username} user={user} />
                :
                <SignOutLinks />}
            </Nav>
            <CustomButton
              btn_class={respMenuClass}
              onClick={() => toggleUserNav()}
            >{!openUserNav && user.username.slice(0, 1)}</CustomButton>
          </Navbar>
        )
      }}

    </AuthContext.Consumer>
  )
}





export default MainNav;