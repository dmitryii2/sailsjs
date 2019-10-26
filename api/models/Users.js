/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Get buildUsageError to construct waterline usage error
const buildUsageError = require('waterline/lib/waterline/utils/query/private/build-usage-error');
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true,
    },

    confirmation: {
      type: 'string',
      required: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    username: {
      type: 'string',
      required: true,
    },

    avatar: {
      type: 'string',
      defaultsTo: 'default.jpg',
    },

  },

  beforeCreate: function(record, next) {
    // Compare password field with confirmation field
    if (record.password !== record.confirmation) {
      // return error if they are different
      return next(buildUsageError('E_INVALID_NEW_RECORD', 'The password confirmation does not match.', 'invoice'));
    }
    // Remove confirmation field from record before save in db
    delete record.confirmation;
    // We need to hash password to increase our security
    // i used 'bcrypt' library for it
    // https://www.npmjs.com/package/bcrypt
    record.password = bcrypt.hashSync(record.password, 10);
    return next();
  },

};

