const authorizeUser = (res, token, tokenAge, response) => {
    res.cookie("token", token, {
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 24
    })
    return response
}

exports.authorizeUser = authorizeUser;
