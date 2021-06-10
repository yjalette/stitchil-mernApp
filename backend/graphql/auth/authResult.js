module.exports = {
    __resolveType(obj) {
        console.log(obj)
        if (obj.username) return 'AuthData';
        if (obj.emailSent) return 'Confirmation';
        if (obj.code) return 'Error';
        return null;
    }
}