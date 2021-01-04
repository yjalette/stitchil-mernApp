import React from 'react';
import { useHistory } from 'react-router-dom';

import CustomDropdown from '../../layout/CustomDropdown';

const SignInLinks = ({ username }) => {
  const { push } = useHistory();

  return <CustomDropdown
    btn_class="fa fa-user iconMenu__btn"
    menu_align="down"
    menu_class="iconMenu"
    items={[
      { item_class: "fa fa-user customIcon", onClick: () => push(`/profile/${username}/gigs`) },
      { item_class: "fa fa-comment customIcon", onClick: () => push(`/messages`) },
      { item_class: "fa fa-gear customIcon", onClick: () => push(`/settings/account`) },
      { item_class: "fa fa-bell customIcon", onClick: () => push(`/${username}/gigs`) },
      { item_class: "fa fa-sign-out customIcon", onClick: () => push(`/logout`) }
    ]} />
}


export default SignInLinks;


