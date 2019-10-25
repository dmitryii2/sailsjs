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
    const postId = this.req.param('id');
    const { id } = await sails.helpers.user(this.req);
    const post = await Posts.updateOne({ id: postId, createdBy: id }).set(inputs);
    if (_.isUndefined(post)) {
      throw 'forbidden';
    }
    return post;
  }


};
