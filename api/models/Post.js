/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var Post = {
  attributes: {
    
    /* e.g.
    nickname: 'string'
    */
    
    id : 'INTEGER',

    title : 'STRING',

    author  : 'STRING',

    content : 'STRING',

    created : 'DATE',

    modified  : 'DATE'
  }

};


module.exports = Post;
