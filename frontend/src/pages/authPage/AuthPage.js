import React, { useState, useReducer, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { withRouter } from "react-router";

import './style.css';
import { form_content } from './helpers'
import AuthLogin from './AuthLogin';
import AuthJoin from './AuthJoin';
import CustomModal from '../../layout/CustomModal';
import AuthForgotPassword from './AuthForgotPassword';
import SecurityPassword from '../../components/security/SecurityPassword';

const AuthPage = ({ history }) => {
    const { authType, token } = useParams();
    const { left_link, right_link, title } = form_content[authType];

    const handleRedirect = (url) => {
        history.push(`/auth/${url}`)
    }

    const handleCloseModal = () => {
        history.push(`/`)
    }

    return (
        <CustomModal
            modal_class="auth"
            modal_title={title}
            modal_size="md"
            modal_footer={left_link && (
                <>
                    <Nav.Link className="clickElem" onClick={() => handleRedirect(left_link.href)} >{left_link && left_link.title} </Nav.Link>
                    <Nav.Link className="clickElem" onClick={() => handleRedirect(right_link.href)}>{right_link && right_link.title}</Nav.Link>
                </>
            )}
            displayWithoutBtn={true}
            onClose={handleCloseModal}
        >
            {authType === "login" && <AuthLogin />}
            {authType === "verify_email" && <AuthLogin verifiedEmail={true} />}
            {authType === "join" && <AuthJoin />}
            {authType === "forgot_password" && <AuthForgotPassword />}
            {authType === "reset" && <SecurityPassword token={token} />}
        </CustomModal>
    )

}

export default withRouter(AuthPage);


