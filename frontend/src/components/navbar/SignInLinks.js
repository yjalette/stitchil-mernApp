import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import "./style.css";

const items = (username) => [
  { icon: "fas fa-user", value: `/profile/${username}/gigs` },
  { icon: "fa fa-comment", value: `/chats` },
  { icon: "fas fa-cog", value: `/settings/account` },
  { icon: "fa fa-bell", value: `/${username}/gigs` },
  { icon: "fas fa-sign-out-alt", value: `/logout` }
]

const SignInLinks = ({ username }) => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  return (
    <>
      {items && items(username).map((item) => {
        const btn_class = `${pathname === item.value && "active"} btn-icon mx-2`
        return (
          <CustomButton
            key={item.value}
            icon={item.icon}
            btn_class={btn_class}
            onClick={() => push(item.value)}
          />
        )
      })}
    </>
  )
}

export default SignInLinks;

