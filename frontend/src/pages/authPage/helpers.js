export function onSuccess({ username, token, googleAuth, role }, setUser, redirect) {
    localStorage.setItem('user', JSON.stringify({ username, googleAuth, role }));
    localStorage.setItem('token', JSON.stringify(token));
    setUser({ token, googleAuth, username, role });
    redirect(`/profile/${username}/gigs`)
}

export const form_content = {
    login: {
        title: "Returning Customer",
        left_link: {
            title: "create an account",
            href: "join"
        },
        right_link: {
            title: "forgot password",
            href: "forgot_password"
        }
    },
    join: {
        title: "Create An Account",
        left_link: {
            title: "returning customer",
            href: "login"
        },
        right_link: {
            title: "forgot password",
            href: "forgot_password"
        }
    },
    forgot_password: {
        title: "Forgot Password",
        left_link: {
            title: "try to login",
            href: "login"
        },
        right_link: {
            title: "create an account",
            href: "join"
        }
    },
    "forgot_password/:token": {
        title: "Reset password",
        left_link: null,
        right_link: null
    },
    verify_email: {
        title: "Please login to continue",
        left_link: {
            title: "returning customer",
            href: "login"
        },
        right_link: {
            title: "forgot password",
            href: "forgot_password"
        }
    },
}