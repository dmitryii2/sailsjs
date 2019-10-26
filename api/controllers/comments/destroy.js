module.exports = {

  friendlyName: 'Destroy',

  description: 'Destroy comments.',

  exits: {
    forbidden: {
      responseType: 'forbidden',
    },
    notFound: {
      responseType: 'notFound',
    },
  },


  fn: async function () {

    const commentId = this.req.param('id'); // get comment id from parameters
    const { id } = await sails.helpers.user(this.req); // get user id by jwt
    /**
     * try to find comment in db by `id` (const commentId) field
     * If mongo will not find record by this condition then `comment` will be undefined
     */
    const comment = await Comments.findOne({ id: commentId });
    if (_.isUndefined(comment)) {
      // if `comment` undefined then throw `notFound` error (404)
      throw { notFound: 'Comment not found' };
    }

    /**
     * `createdBy` field contains commentary ownerId (userId)
     */
    if (comment.createdBy !== id) {
      // if id from jwt and ownerId (comment.createdBy) not equals then throw `forbidden` error (403)
      throw 'forbidden';
    }

    // destroy
    await Comments.destroyOne({ id: commentId });

    // return success
    return { success: true };

  }


};
