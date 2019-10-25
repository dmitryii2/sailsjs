/**
 * authGuard.js
 * This policy verifying user's jwt before requests
 */

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  // Get 'Authorization' header from all headers
  const { authorization } = req.headers;
  // checking that user sent this header
  if (authorization) {
    // split by 'Bearer '
    // cause authorization by Bearer token
    // get element by index [1] (there are token)
    const token = authorization.split('Bearer ')[1];
    if (token) {
      try {
        // verify jwt
        jwt.verify(token, 'MyPrivateKey');
        return proceed();
      }catch(e) {
        // error
      }
    }
  }

  // if user sent incorrect token then throw error (401)
  return res.status(401).json({ 'errors': ['Incorrect token'] });
};
