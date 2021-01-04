import React, { useState, useReducer, useEffect } from 'react';
import { Modal, Nav } from 'react-bootstrap';

import './auth.css'

import { authReducer } from './authReducer';
import CustomModal from '../../layout/CustomModal';

const AuthIndex = () => {
    const [activeComponent, setActiveComponent] = useState("LOGIN");
    const [state, dispatch] = useReducer(authReducer, activeComponent);

    useEffect(() => {
        if (activeComponent) dispatch({ type: activeComponent.toUpperCase() })
    }, [activeComponent])

    if (!state) return <div>loading</div>

    const { title, left_link, right_link, Component } = state;

    return (
        <CustomModal
            modal_class="auth"
            modal_title={title}
            modal_size="md"
            modal_footer={(
                <>
                    <Nav.Link className="customLink" onClick={() => setActiveComponent(left_link.href)} >{left_link && left_link.title} </Nav.Link>
                    <Nav.Link className="customLink" onClick={() => setActiveComponent(right_link.href)}>{right_link && right_link.title}</Nav.Link>
                </>
            )}
            btn_class="fa fa-sign-in customIcon auth__iconBtn"
        >
            {Component}
        </CustomModal>
    )

}

export default AuthIndex


