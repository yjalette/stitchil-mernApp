import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from "react-router";

import './style.css';
import { form_content } from './constants'
import CustomModal from '../../layout/CustomModal';

const AuthPage = ({ history, auth_type, children }) => {
    const { left_link, right_link, title } = form_content[auth_type];

    const handleRedirect = (url) => history.push(`/auth/${url}`)
    const onModalClose = () => history.push(`/`)
    return (
        <CustomModal
            modal_class="auth"
            modal_title={title}
            modal_size="md"
            modal_footer={left_link && (
                <>
                    <Nav.Link
                        className="clickElem"
                        onClick={() => handleRedirect(left_link.href)}
                    >
                        {left_link && left_link.title}
                    </Nav.Link>
                    <Nav.Link
                        className="clickElem"
                        onClick={() => handleRedirect(right_link.href)}
                    >
                        {right_link && right_link.title}
                    </Nav.Link>
                </>
            )}
            displayWithoutBtn
            onClose={onModalClose}
        >
            {children}
        </CustomModal>
    )

}

export default withRouter(AuthPage);


