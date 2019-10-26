/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  /* Auth */
  'POST /api/v1/login': 'login',                          // Authorization
  'POST /api/v1/register': 'register',                    // Registration

  /* Account */
  'PATCH /api/v1/user': 'user/update',                    // Update account information
  'POST /api/v1/user/avatar': 'user/avatar',              // Upload user avatar

  /* Posts */
  'GET /api/v1/posts': 'posts/find',                      // Get all posts
  'POST /api/v1/posts': 'posts/create',                   // Create post
  'PATCH /api/v1/posts/:id': 'posts/update',              // Update post
  'DELETE /api/v1/posts/:id': 'posts/destroy',            // Destroy post

  /* Comments */
  'GET /api/v1/posts/:postId/comments': 'comments/find',  // Get all comments of post
  'POST /api/v1/comments': 'comments/create',             // Create comment
  'PATCH /api/v1/comments/:id': 'comments/update',        // Update comment
  'DELETE /api/v1/comments/:id': 'comments/destroy',      // Destroy comment
  'PATCH /api/v1/comments/:id/like': 'comments/like',     // Like/Unlike comment


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
