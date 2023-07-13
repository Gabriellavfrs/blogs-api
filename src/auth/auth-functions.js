const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const validateAuth = (token) => jwt.verify(token, secret);

module.exports = { createToken, validateAuth };