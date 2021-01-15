import React from 'react';
import { useHistory } from 'react-router-dom';

import CustomDropdown from '../../layout/CustomDropdown';

const SignInLinks = ({ username }) => {
  const { push } = useHistory();

  const handleClick = ({ target }) => push(target.value);

  return <CustomDropdown
    btn_class="fa fa-user iconMenu__btn"
    menu_align="down"
    menu_class="iconMenu"
    onClick={handleClick}
    items={[
      { icon: "fa fa-user customIcon", value: `/profile/${username}/gigs` },
      { icon: "fa fa-comment customIcon", value: `/messages` },
      { icon: "fa fa-gear customIcon", value: `/settings/account` },
      { icon: "fa fa-bell customIcon", value: `/${username}/gigs` },
      { icon: "fa fa-sign-out customIcon", value: `/logout` }
    ]} />
}


export default SignInLinks;


