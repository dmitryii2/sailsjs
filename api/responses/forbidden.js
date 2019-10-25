/**
 * forbidden.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.forbidden();
 *     // -or-
 *     return res.forbidden(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'forbidden'
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

module.exports = function serverError(optionalData) {

  const { res } = this;
  return res.status(403).send({ errors: ['forbidden'] }).json();

};
