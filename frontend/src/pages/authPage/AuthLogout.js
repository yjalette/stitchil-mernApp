import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router';
import AuthContext from '../../context/Auth-context';
import { LOGOUT_MUTATION } from './graphql/mutations';

const AuthLogout = ({ history }) => {
    const [post] = useMutation(LOGOUT_MUTATION)
    const authContext = useContext(AuthContext);

    const handleClick = () => {
        post();
        authContext.logout();
        localStorage.removeItem('user')
        history.push('/')
    }

    useEffect(() => {
        handleClick()
    }, [])

    return null
}

export default withRouter(AuthLogout);
