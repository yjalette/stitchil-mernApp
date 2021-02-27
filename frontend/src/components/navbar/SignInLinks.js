import React from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import "./style.css";

const SignInLinks = ({ username }) => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const items = [
    { icon: "fa fa-user-circle-o btn-icon", value: `/profile/${username}/gigs` },
    { icon: "fa fa-comment btn-icon", value: `/messages` },
    { icon: "fa fa-gear btn-icon", value: `/settings/account` },
    { icon: "fa fa-bell btn-icon", value: `/${username}/gigs` },
    { icon: "fa fa-sign-out btn-icon", value: `/logout` }
  ]

  return <Nav className="navUser">{items && items.map((item, i) =>
    <Nav.Item
      key={i}
      as="button"
      eventkey={i}
      className={`${item.icon} ${pathname === item.value && "navUser__item-active"} navUser__item`}
      onClick={() => push(item.value)} />)}
  </Nav>

}
export default SignInLinks;