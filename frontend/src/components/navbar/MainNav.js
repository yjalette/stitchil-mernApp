import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./style.css";
import SignOutLinks from './SignOutLinks';
import SignInLinks from './SignInLinks';
import AuthContext from '../../context/Auth-context';
import CustomButton from '../../layout/button/CustomButton';
import { useToggle } from '../../custom_hooks/useToggle';

const MainNav = () => {
  const { pathname } = useLocation();
  const [openUserNav, toggleUserNav] = useToggle(false);
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
            {user && user.username ?
              <>
                <Nav className={`mainNav-user ${openUserNav ? "open" : "hide"}`}>
                  <SignInLinks username={user.username} />
                </Nav>
                <CustomButton
                  btn_class={respMenuClass}
                  onClick={() => toggleUserNav()}
                >{!openUserNav && user && user.username.slice(0, 1)}</CustomButton>
              </>
              : <SignOutLinks />}
          </Navbar>
        )
      }}

    </AuthContext.Consumer>
  )
}





export default MainNav;