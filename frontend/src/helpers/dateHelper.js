const options = {
    month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    timeZone: 'America/New_York'
};



export default createdAt => new Intl.DateTimeFormat('en-AU', options).format(new Date(Number(createdAt)))