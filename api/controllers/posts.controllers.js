var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports.postsGetAll = function(req, res) {

  console.log('GET the posts');
  console.log(req.query);

  Post
    .find()
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
