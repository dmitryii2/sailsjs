module.exports = {


  friendlyName: 'Register',


  description: 'Register action.',


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
    // Compare password field with confirmation field
    if (inputs.password !== inputs.confirmation) {
      // return error if passwords are different
      throw { badRequest: 'The password confirmation does not match.' };
    }
    /**
     * email field must be unique
     * because of this i do findOne request in db
     * if record exists then email not unique
    */
    const hasUserWithThatEmail = await Users.findOne({ email: inputs.email });
    if ( !_.isUndefined(hasUserWithThatEmail) ) {
      throw { badRequest: 'This email already taken.' };
    }
    /**
     * Create user in db
     * also i set default avatar as 'default.jpg'
     */
    return await Users.create({ ...inputs, avatar: 'default.jpg' }).fetch();
  }


};
