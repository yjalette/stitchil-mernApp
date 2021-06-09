const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const generateJWT = (userId, email) => jwt.sign({ userId, email }, "supersecret", { expiresIn: '100h' })

const verifyJWT = token => jwt.verify(token, 'supersecret')

const comparePwd = async (pwd1, pwd2) => await bcrypt.compare(pwd1, pwd2);

const createPwd = async pwd => await bcrypt.hash(pwd, 3);

exports.generateJWT = generateJWT;
exports.verifyJWT = verifyJWT;
exports.comparePwd = comparePwd;
exports.createPwd = createPwd;