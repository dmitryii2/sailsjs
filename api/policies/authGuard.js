/**
 * authGuard.js
 * This policy verifying user jwt
 */

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split('Bearer ')[1];
    if (token) {
      try {
        jwt.verify(token, 'MyPrivateKey');
        return proceed();
      }catch(e) {
        // error
      }
    }
  }

  return res.status(403).json({ 'errors': ['Incorrect token'] });
};
