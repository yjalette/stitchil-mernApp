const authorizeUser = (res, token, tokenAge, response) => {
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 60 * 100000 // 100 min
    })
    return response
}

exports.authorizeUser = authorizeUser;
