/**
 * Comments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    postId: {
      type: 'string',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    },
    createdBy: {
      type: 'string',
      required: true,
    },
    likes: {
      type: 'json',
      defaultsTo: [],
    },
  },

};

