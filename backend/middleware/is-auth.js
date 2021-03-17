
const jwt = require('jsonwebtoken');
var cookie = require('cookie');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = cookie.parse(req.get("Cookie")).token
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    // const token = authHeader.split(' ')[1];
    if (!token || token === '') {
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