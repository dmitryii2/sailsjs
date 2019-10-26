module.exports = {


  friendlyName: 'Update',


  description: 'Update comments.',


  inputs: {
    message: {
      type: 'string',
    },
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    },
    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs) {

    const commentId = this.req.param('id'); // get comment id from parameters
    const { id } = await sails.helpers.user(this.req); // get user id by jwt
    /**
     * try to find comment in db by `id` (const commentId) field
     * If mongo will not find record by this condition then `const comment` will be undefined
     */
    const comment = await Comments.findOne({ id: commentId });
    if (_.isUndefined(comment)) {
      // if `const comment` undefined just throw `not found` error (404)
      throw { notFound: 'Comment not found' };
    }

    /**
     * `createdBy` field contains commentary ownerId (userId)
     */
    if (comment.createdBy !== id) {
      throw 'forbidden';
    }

    // update and return comment
    return await Comments.updateOne({ id: commentId }).set(inputs);

  }


};
