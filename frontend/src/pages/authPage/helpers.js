export function onSuccess({ username, googleAuth, role }, setUser, redirect) {
    localStorage.setItem('user', JSON.stringify({ username, googleAuth, role }));
    // localStorage.setItem('token', JSON.stringify(token));
    setUser({ googleAuth, username, role });
    redirect(`/profile/${username}/gigs`)
}



