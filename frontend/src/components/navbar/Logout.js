import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import AuthContext from '../../context/Auth-context';

const Logout = (props) => {
    const authContext = useContext(AuthContext);

    const handleClick = () => {
        authContext.logout();
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        props.history.push('/')
    }

    useEffect(() => {
        handleClick()
    }, [])

    return null
}

export default withRouter(Logout);
