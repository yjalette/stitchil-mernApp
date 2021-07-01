const authorizeUser = (res, token, tokenAge, response) => {
    res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        maxAge: 1 * 60 * 100000, // 100 min,
        SameSite: "none",
    })
    return response
}

exports.authorizeUser = authorizeUser;
