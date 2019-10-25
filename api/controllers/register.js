const buildUsageError = require('waterline/lib/waterline/utils/query/private/build-usage-error');

module.exports = {


  friendlyName: 'Register',


  description: 'Register something.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },

    confirmation: {
      type: 'string',
      required: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    username: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    badRequest: {
      responseType: 'badRequest'
    },
    success: {
      responseType: 'success',
    },
  },


  fn: async function (inputs) {
    if (inputs.password !== inputs.confirmation) {
      // return error if passwords are different
      throw { badRequest: 'The password confirmation does not match.' };
    }
    const hasUserWithThatEmail = await Users.findOne({ email: inputs.email });
    if ( !_.isUndefined(hasUserWithThatEmail) ) {
      throw { badRequest: 'This email already taken.' };
    }
    return await Users.create({ ...inputs, avatar: 'default.jpg' }).fetch();
  }


};
