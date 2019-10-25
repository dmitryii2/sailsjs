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
    let limit = !_.isUndefined(inputs.limit) ? inputs.limit : 5;
    let page = !_.isUndefined(inputs.page) ? inputs.page : 1;
    const count = Math.floor(await Posts.count() / limit) + 1;
    const posts = await Posts.find().limit(limit).skip(limit * (page - 1));
    return {
      count,
      page,
      limit,
      posts,
    };
  }


};
