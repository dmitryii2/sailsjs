module.exports = {


  friendlyName: 'Create',


  description: 'Create posts.',


  inputs: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    const { id } = await sails.helpers.user(this.req);
    return await Posts.create({ ...inputs, createdBy: id }).fetch();

  }


};
