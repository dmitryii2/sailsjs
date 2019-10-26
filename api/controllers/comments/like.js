module.exports = {

  friendlyName: 'Like',

  description: 'Like comments.',

  exits: {
    notFound: {
      responseType: 'notFound',
    },
  },


  fn: async function (inputs) {
    const commentId = this.req.param('id');
    const comment = await Comments.findOne({ id: commentId });
    if (_.isUndefined(comment)) {
      throw { notFound: 'Comment not found' };
    }
    const { id } = await sails.helpers.user(this.req);
    let action = comment.likes.includes(id);
    if(action) {
      // unlike
      comment.likes = comment.likes.filter(userId => userId !== id);
    } else {
      // like
      comment.likes.push(id);
    }
    await Comments.updateOne({ id: commentId }).set(comment);
    return { success: true, action: action ? 'unlike' : 'like' };

  }


};
