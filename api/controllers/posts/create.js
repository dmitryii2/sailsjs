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

    const { id } = await sails.helpers.user(this.req); // get user id by jwt
    /**
     * Create post
     * createdBy - id of user who created the post
     * `createdBy` field will need for check: Can user destroy or update post?
     */
    return await Posts.create({ ...inputs, createdBy: id }).fetch();

  }


};
