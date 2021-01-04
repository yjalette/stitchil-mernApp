export const onLogin = ({ user, token }, createUserContext, redirect) => {
    const { googleAuth, username, role } = user;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify({ googleAuth, role }));
    createUserContext({ token, googleAuth, username, role });
    redirect(`/profile/${username}/gigs`);
}