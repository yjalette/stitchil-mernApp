const server_error = { code: 500, "message": "Server Error. Please Try Again" };
const unauthorized_error = { code: 401, error: "Unauthenticated" };
const notUser_error = { code: 401, message: "User Does Not Exit" };
const wrongPwd_error = { code: 400, message: "Wrong Password" };
const usernameTaken_error = { code: 400, message: "This username is already taken" };
const emailTaken_error = { code: 400, message: "This email already exists" };

const update_success = { "success": true, "message": "Updated!" };
const login_redirect = { "success": true, "message": "Success! You're being redirected to login page" };

exports.server_error = server_error;
exports.unauthorized_error = unauthorized_error;
exports.notUser_error = notUser_error;
exports.wrongPwd_error = wrongPwd_error;
exports.emailTaken_error = emailTaken_error;
exports.usernameTaken_error = usernameTaken_error;
exports.update_success = update_success;
exports.login_redirect = login_redirect;