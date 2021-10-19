export function onSuccess({ username, googleAuth, role }, setUser, redirect) {
    localStorage.setItem('user', JSON.stringify({ username, googleAuth, role }));
    setUser({ googleAuth, username, role });
    redirect(`/profile/${username}/gigs/`)
}



export const onLogout = () => {
    return window.location.href = "/logout"
}