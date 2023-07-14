const { getPayload } = require('../auth/auth-functions');

const validateJwt = async (req, res, next) => {
  try {
    console.log(req);
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = bearerToken.split(' ')[1];

    const payload = getPayload(token);

    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJwt;