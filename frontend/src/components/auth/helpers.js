export function onSuccess({ username, token, googleAuth, role }, setUser, redirect) {
    // localStorage.setItem('username', JSON.stringify(username));
    // localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify({ username, token, googleAuth, role }));
    setUser({ token, googleAuth, username, role });
    redirect(`/profile/${username}/gigs`)
}

