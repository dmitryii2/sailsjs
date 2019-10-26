module.exports = {


  friendlyName: 'Create',


  description: 'Create comments.',


  inputs: {
    postId: {
      type: 'string',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    },
  },


  fn: async function (inputs) {

    const { id } = await sails.helpers.user(this.req);
    const post = await Posts.findOne({ id: inputs.postId });
    if (_.isUndefined(post)) {
      throw { notFound: 'Post not found' };
    }
    return await Comments.create({ ...inputs, createdBy: id }).fetch();

  }


};
