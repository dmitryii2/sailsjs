module.exports = {


  friendlyName: 'Find',


  description: 'Find comments.',


  inputs: {
    page: {
      type: 'number',
      min: 1,
    },
    limit: {
      type: 'number',
      min: 1,
      max: 25,
    },
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    },
  },


  fn: async function (inputs) {
    const postId = this.req.param('postId');
    const post = await Posts.findOne({ id: postId });
    if (_.isUndefined(post)) {
      throw { notFound: 'Post not found' };
    }

    /**
     * let limit - how many comments will be show in response
     * let page - current page of list of comments
     * const count - count of pages
     * let comments - Comments from DB
     */

    // if user was not send `limit` then it will be set 5 by default
    let limit = !_.isUndefined(inputs.limit) ? inputs.limit : 5;
    // if user was not send `page` then it will be set 1 by default
    let page = !_.isUndefined(inputs.page) ? inputs.page : 1;

    // Get comments by postId
    let comments = await Comments.find({ postId }).limit(limit).skip(limit * (page - 1));

    // get comments count and divide by `limit` to get `count`
    const count = Math.ceil(await Comments.count({ postId }) / limit);

    // count likes for each comment
    comments = comments.map(comment => ({ ...comment, likesCount: comment.likes.length  }));

    return {
      count,
      page,
      limit,
      comments,
    };

  }


};
