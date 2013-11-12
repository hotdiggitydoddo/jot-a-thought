/**
 * PostsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/posts/create`
   */
   create: function (req, res) {
    var title = req.param("title");
    var content = req.param("content");
    
    Post.create( {author: 'Ryan', title: title, content: content}).done(function(error, post) {
      if (error) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      } else {
        res.redirect('/');
      }
    });
  },


  /**
   * Action blueprints:
   *    `/posts/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/posts/edit`
   */
   edit: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/posts/delete`
   */
   delete: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostsController)
   */
  _config: {}

  
};
