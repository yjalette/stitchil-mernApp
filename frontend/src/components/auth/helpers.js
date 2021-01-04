export function onSuccess({ username, token, googleAuth, role }, setUser, redirect) {
    console.log(username)
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify({ googleAuth, role }));
    setUser({ token, googleAuth, username, role });
    redirect(`/profile/${username}/gigs`)
}

