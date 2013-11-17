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
    Post.find(function(err, posts) {
      posts.forEach(function(post) {
        post.createdAt = dateFormat(post.createdAt, "dddd, mmmm, dS, yyyy, @ h-8:MM TT");
      });
      res.view({ model: posts });
    });
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
    var username = req.param("username");
    var password = req.param("password");

    if (username) {
      if (username == 'create-admin') {
        var hasher = require("password-hash");
        password = hasher.generate(password);
        Admin.create({username: 'admin', password: password}).done(function(err, admin) {
        if (err) {
          console.log(err);
        }
        else if (admin)
          console.log(admin);
        });
      } else if (username == 'admin') {
          Admin.findOneByUsername(username).done(function(err, admin) {
            if (err) {
              res.set('error, DB Error');
              res.send(500, { error: "DB Error"});
            } else {
              if (admin) {
                var hasher = require("password-hash");
                if (hasher.verify(password, admin.password)) {
                  req.session.admin = true;
                  console.log('admin in');
                } else {
                  res.set('error', 'Password is incorrect.');
                  res.send(400, { error: "Password is incorrect." });
                }
              } 
            }
          });
        } else {
          res.set('error', "Admin access only.");
          res.send(400, { error: "Admin access only."});
        } 
      }

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
