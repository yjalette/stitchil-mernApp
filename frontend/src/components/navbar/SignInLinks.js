import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import CustomDropdown from '../../layout/CustomDropdown';

const SignInLinks = ({ username }) => {
  const { push } = useHistory();

  const handleClick = ({ target }) => push(target.value);

  const items = [
    { icon: "fa fa-user btn-icon", value: `/profile/${username}/gigs` },
    { icon: "fa fa-comment btn-icon", value: `/messages` },
    { icon: "fa fa-gear btn-icon", value: `/settings/account` },
    { icon: "fa fa-bell btn-icon", value: `/${username}/gigs` },
    { icon: "fa fa-sign-out btn-icon", value: `/logout` }
  ]

  //   return <CustomDropdown
  //     btn_class="fa fa-user iconMenu__btn"
  //     menu_align="down"
  //     menu_class="iconMenu"
  //     onClick={handleClick}
  //     items={[
  //       { icon: "fa fa-user btn-icon", value: `/profile/${username}/gigs` },
  //       { icon: "fa fa-comment btn-icon", value: `/messages` },
  //       { icon: "fa fa-gear btn-icon", value: `/settings/account` },
  //       { icon: "fa fa-bell btn-icon", value: `/${username}/gigs` },
  //       { icon: "fa fa-sign-out btn-icon", value: `/logout` }
  //     ]} />
  // }


  return <Nav
    className="userMenu"
    activeKey="/home"

  >
    {items && items.map((item, i) => <Nav.Item
      key={i}
      as="button"
      variant=""
      className={`${item.icon} userMenu__item mx-2`}
      onClick={() => push(item.value)} />)}
  </Nav>

}
export default SignInLinks;