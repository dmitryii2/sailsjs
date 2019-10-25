/**
 * success.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.success();
 *     // -or-
 *     return res.success(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'success'
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

module.exports = function success(optionalData) {
  const { res } = this;
  return res.status(200).send(optionalData).json();
};
