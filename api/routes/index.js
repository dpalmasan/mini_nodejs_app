var express = require('express');
var router = express.Router();

var ctrlPosts = require('../controllers/posts.controllers.js');

router
  .route('/posts')
  .get(ctrlPosts.postsGetAll)

router
  .route('/posts/:postId')
  .put(ctrlPosts.postsUpdateOne);

module.exports = router;
