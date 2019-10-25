/**
 * Helper 'user.js' can get user from db by jwt
 */

const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'User',

  description: 'Get user by jwt.',

  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs) {
    const token = inputs.req.headers.authorization.split('Bearer ')[1];
    const { id } = jwt.verify(token, 'MyPrivateKey');
    return await Users.findOne({ id });
  }


};

