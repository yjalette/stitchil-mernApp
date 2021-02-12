import React, { useState, useReducer, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { withRouter } from "react-router";

import './style.css';
import { form_content } from './helpers'
import CustomModal from '../../layout/CustomModal';

const AuthPage = ({ history, auth_type, children }) => {
    const { left_link, right_link, title } = form_content[auth_type];
    const handleRedirect = (url) => history.push(`/auth/${url}`)
    const handleCloseModal = () => history.push(`/`)

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
            displayWithoutBtn
            onClose={handleCloseModal}
        >
            {children}
        </CustomModal>
    )

}

export default withRouter(AuthPage);


