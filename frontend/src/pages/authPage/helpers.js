export function onSuccess({ username, token, googleAuth, role }, setUser, redirect) {
    localStorage.setItem('user', JSON.stringify({ username, googleAuth, role }));
    localStorage.setItem('token', JSON.stringify(token));
    setUser({ token, googleAuth, username, role });
    redirect(`/profile/${username}/gigs`)
}



