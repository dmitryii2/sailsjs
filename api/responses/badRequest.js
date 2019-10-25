/**
 * badRequest.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.badRequest();
 *     // -or-
 *     return res.badRequest(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'badRequest'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function badRequest(optionalData) {

  /**
   * Default response has many unnecessary parameters
   * Because of this i decided to create custom response for 404 error (bad request)
   * Examples usage above
   * Type of optionalData must be String, Array or Object with 'problems' key
  */

  const statusCode = 400;
  const { res } = this;

  if ( _.isObject(optionalData) && 'problems' in optionalData) {
    return res.status(statusCode).json({ errors: optionalData.problems });
  }

  if ( _.isArray(optionalData) ) {
    return res.status(statusCode).json({ errors: optionalData });
  }

  if ( _.isString(optionalData) ) {
    return res.status(statusCode).json({ errors: [ optionalData ] });
  }

};
