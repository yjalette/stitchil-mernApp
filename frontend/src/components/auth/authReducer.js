import React from 'react';

import Join from './Join'
import ForgotPassword from './ForgotPassword';
import Login from './Login';

const login = {
    title: "Returning Customer",
    left_link: {
        title: "create an account",
        href: "join"
    },
    right_link: {
        title: "forgot password",
        href: "forgotpassword"
    }
}

const join = {
    title: "Create An Account",
    left_link: {
        title: "returning customer",
        href: "login"
    },
    right_link: {
        title: "forgot password",
        href: "forgotpassword"
    }
}

const forgot_password = {
    title: "Forgot Password",
    left_link: {
        title: "try to login",
        href: "login"
    },
    right_link: {
        title: "create an account",
        href: "join"
    }
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                "Component": <Login />,
                ...login
            }
        }
        case "JOIN": {
            return {
                "Component": <Join />,
                ...join
            }
        }
        case "FORGOTPASSWORD": {
            return {
                "Component": <ForgotPassword />,
                ...forgot_password
            }
        }

        default: return
    }
}