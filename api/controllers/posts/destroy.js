module.exports = {


  friendlyName: 'Destroy',

  description: 'Destroy posts.',

  exits: {
    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function () {

    const postId = this.req.param('id'); // get post id from parameters
    const { id } = await sails.helpers.user(this.req); // get user id by jwt
    /**
     * try to destroy post in db by `id` (const postId) and `createdBy` (const id) fields
     * `createdBy` field contains user ID
     * If mongo will not find record by this conditions then `wasPostDeleted` will be undefined
    */
    const wasPostDeleted = await Posts.destroyOne({ id: postId, createdBy: id });
    if (_.isUndefined(wasPostDeleted)) {
      // so if `wasPostDeleted` undefined just throw `forbidden` error
      throw 'forbidden';
    }
    // if `wasPostDeleted` has data then returns { success: true }
    return { success: true };

  }


};
