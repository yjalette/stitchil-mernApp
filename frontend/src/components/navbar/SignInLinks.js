import React, { memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CustomButton from '../../layout/button/CustomButton';
import displayItems from './helpers/displayItems';
import "./style.css";

const SignInLinks = memo(
  ({ username }) => {
    const { push } = useHistory();
    const { pathname } = useLocation();
    return (
      <>
        {displayItems && displayItems(username).map((item) => {
          const btn_class = `${pathname.includes(item.url) && "active"} ${item.icon} btn-icon mx-2`
          return (
            <CustomButton
              key={item.url}
              btn_class={btn_class}
              btn_otherProps={{
                title: item.title
              }}
              onClick={() => push(item.url)}
            />
          )
        })}
      </>
    )
  }
)

export default SignInLinks;

