module.exports = {


  friendlyName: 'Find',


  description: 'Find posts.',


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


  exits: {},


  fn: async function (inputs) {
    /**
     * let limit - how many posts will be show in response
     * let page - current page of list of posts
     * const count - count of pages
     * const posts - Posts from DB
     */

    // if user was not send `limit` then it will be set 5 by default
    let limit = !_.isUndefined(inputs.limit) ? inputs.limit : 5;
    // if user was not send `page` then it will be set 1 by default
    let page = !_.isUndefined(inputs.page) ? inputs.page : 1;
    // get posts count from db and divide by `limit` to get `count`
    const count = Math.floor(await Posts.count() / limit) + 1;
    // It is common .find() with .limit() and .skip()
    const posts = await Posts.find().limit(limit).skip(limit * (page - 1));
    return {
      count,
      page,
      limit,
      posts,
    };
  }


};
