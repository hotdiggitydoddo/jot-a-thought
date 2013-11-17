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
    
  index: function (req, res) {

    var model = Post.find(function(err, posts) {
      //res.view({model: posts});
      console.log(posts);
      return res.view(model);
    });
  },

  'new': function (req ,res) {
    res.locals.post = _.clone(req.session.post);
    if (res.locals.post)
      res.view({post: res.locals.post});
    else
      res.view({post: [{title: ""}, {content: ""}]});
    req.session.post = {};
  },
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
        res.redirect('/home/index');
      }
    });
  },

  edit: function(req, res) {
    var id = req.param("id");
    console.log("in the edit");
    var postToUpdate = Post.findOne(id).done(function(err, post) {
      if (err) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      }
        console.log("updating post");

      if (post) {
        post.title = req.param("title");
        post.content = req.param("content");
        post.save(function(err) {
          console.log("save");
        });
      }
    });
    res.redirect('/');
  },
  /**
   * Action blueprints:
   *    `/posts/update`
   */
   update: function (req, res) {
    
    var id = req.param("id");
    var postToEdit = Post.findOne(id).done(function(err, post) {
      if (err) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      };

      if (post) {
        req.session.post = post;
        res.redirect('/post/new');
      };

    });
  },


  /**
   * Action blueprints:
   *    `/posts/edit`
   */
   


  /**
   * Action blueprints:
   *    `/posts/delete`
   */
   delete: function (req, res) {
    var id = req.param("id");
    var postToDestroy = Post.findOne(id).done(function(err, post) {
      if (err) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      }

      if (post) {
        post.destroy(function(err) {
          if (err) {
            res.set('error', 'DB Error');
            res.send(500, { error: 'DB Error'});
          }
          // post destroyed.
          res.redirect('/');
        });
      }
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostsController)
   */
  _config: {}

  
};
