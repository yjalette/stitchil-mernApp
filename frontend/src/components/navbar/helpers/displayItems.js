export default (username) => [
    { icon: "fas fa-user", url: `/profile/${username}/gigs`, title: "profile" },
    { icon: "fa fa-comment", url: `/chat-rooms/`, title: "messages" },
    { icon: "fas fa-cog", url: `/settings/account`, title: "settings" },
    { icon: "fas fa-tachometer-alt", url: `/dashboard/`, title: "dashboard" },
    { icon: "fa fa-bell", url: `/`, title: "notifications" },
    { icon: "fas fa-sign-out-alt", url: `/logout`, title: "logout" }
]