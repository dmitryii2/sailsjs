module.exports = {


  friendlyName: 'Update',


  description: 'Update posts.',


  inputs: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },


  exits: {
    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs) {
    const postId = this.req.param('id'); // get post id from parameters
    const { id } = await sails.helpers.user(this.req); // get user id by jwt
    /**
     * try to update post in db by `id` (const postId) and `createdBy` (const id) fields
     * `createdBy` field contains user ID
     * If mongo will not find record by this conditions then `const post` will be undefined
     */
    const post = await Posts.updateOne({ id: postId, createdBy: id }).set(inputs);
    if (_.isUndefined(post)) {
      // so if `post` undefined just throw `forbidden` error
      throw 'forbidden';
    }

    // if `post` has data then returns updated post
    return post;
  }


};
