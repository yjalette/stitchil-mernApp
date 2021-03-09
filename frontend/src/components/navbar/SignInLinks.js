import React from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import "./style.css";

const SignInLinks = ({ username }) => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const items = [
    { icon: "fas fa-user", value: `/profile/${username}/gigs` },
    { icon: "fa fa-comment", value: `/chats` },
    { icon: "fas fa-cog", value: `/settings/account` },
    { icon: "fa fa-bell", value: `/${username}/gigs` },
    { icon: "fas fa-sign-out-alt", value: `/logout` }
  ]

  return <Nav className="navUser">{items && items.map((item, i) =>
    <Nav.Item
      key={i}
      as="button"
      eventkey={i}
      className={`${item.icon} ${pathname === item.value && "navUser__item-active"} btn-icon navUser__item`}
      onClick={() => push(item.value)} />)}
  </Nav>

}
export default SignInLinks;