/**
 * HomeController
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
   *    `/home/index`
   *    `/home`
   */
   index: function (req, res) {
    var dateFormat = require('dateformat');
    
    Post.find()
    .limit(10)
    .sort('createdAt DESC')
    .exec(function(err, posts) {
      posts.forEach(function(post) {
        post.createdAt = dateFormat(post.createdAt, "dddd, mmmm, dS, yyyy, @ h:MM TT");
      });
      res.view({ model: posts });
    });


    //Post.find(function(err, posts) {
      //posts.forEach(function(post) {
        //post.createdAt = dateFormat(post.createdAt, "dddd, mmmm, dS, yyyy, @ h:MM TT");
      //});
      //res.view({ model: posts });
    //});
  },


  /**
   * Action blueprints:
   *    `/home/about`
   */
   about: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/home/contact`
   */
   contact: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/');
  },

  login: function (req, res) {
    

    if (username && username == "CREATE_ADMIN") {
      
    }

    res.redirect('/');
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  _config: {}

  
};
