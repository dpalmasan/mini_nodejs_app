var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports.postsGetAll = function(req, res) {

  console.log('GET the posts');
  console.log(req.query);

  Post
    .find()
    .sort({created_at: 'descending'})
    .exec(function(err, posts) {
      console.log(err);
      console.log(posts);
      if (err) {
        console.log("Error finding posts");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found posts", posts.length);
        res
          .json(posts);
      }
    });

};

module.exports.postsUpdateOne = function(req, res) {
  var postId = req.params.postId;

  console.log('GET postId', postId);

  Post
    .findById(postId)
    .exec(function(err, post) {
      if (err) {
        console.log("Error finding post");
        res
          .status(500)
          .json(err);
          return;
      } else if(!post) {
        console.log("postId not found in database", postId);
        res
          .status(404)
          .lson({
            "message" : "Post ID not found " + postId
          });
          return;
      }

      post.show = false;

      post
        .save(function(err, postUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};
