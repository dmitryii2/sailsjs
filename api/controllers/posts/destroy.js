module.exports = {


  friendlyName: 'Destroy',

  description: 'Destroy posts.',

  exits: {
    forbidden: {
      responseType: 'forbidden',
    },
  },


  fn: async function () {

    const postId = this.req.param('id');
    const { id } = await sails.helpers.user(this.req);
    const wasPostDeleted = await Posts.destroyOne({ id: postId, createdBy: id });
    if (_.isUndefined(wasPostDeleted)) {
      throw 'forbidden';
    }
    return { success: true };

  }


};
