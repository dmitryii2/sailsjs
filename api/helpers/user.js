const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'User',


  description: 'User something.',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const token = inputs.req.headers.authorization.split('Bearer ')[1];
    const { id } = jwt.verify(token, 'MyPrivateKey');
    return await Users.findOne({ id });
  }


};

