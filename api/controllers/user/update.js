module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    username: {
      type: 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const { id } = await sails.helpers.user(this.req);
    return await Users.updateOne({ id }).set(inputs);
  }


};
