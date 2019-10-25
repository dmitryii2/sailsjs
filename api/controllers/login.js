const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Login',


  description: 'Login something.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    notAuthorized: {
      statusCode: 401,
    },
  },


  fn: async function (inputs) {

    // Find user by email in DB
    const user = await Users.findOne({email: inputs.email});
    if (user) {
      // compare hashes (what user sent and pass in db)
      if (bcrypt.compareSync(inputs.password, user.password)) {
        // if hashes equals then generate JWT (JSON Web Token)
        // https://en.wikipedia.org/wiki/JSON_Web_Token
        // i used 'jsonwebtoken' lib
        // https://www.npmjs.com/package/jsonwebtoken
        const { id } = user;
        const token = jwt.sign({ id }, 'MyPrivateKey');
        // return token to user
        return { token };
      }
    }

    throw {
      notAuthorized: {
        errors: ['Incorrect login or password'],
      }
    };

  }


};
