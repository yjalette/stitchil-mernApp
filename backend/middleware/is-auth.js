
const jwt = require('jsonwebtoken');
var cookie = require('cookie');

module.exports = (req, res, next) => {
    const cookies = req.get("Cookie");
    const token = cookies ? cookie.parse(cookies).token : '';

    if (!token || token === '') {
        console.log("here")
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'supersecret');

    } catch (err) {
        req.isAuth = false;
        req.error = err;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;

    next();
};