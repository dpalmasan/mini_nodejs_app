/**
 * This script is for forcing database load, to use the app the first time.
 */

var https = require('https');
require('./api/data/db.js');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var urldata = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
function OnResponse(response) {
  var data = ''; //This will store the page we're downloading.
  response.on('data', function(chunk) { //Executed whenever a chunk is received.
    data += chunk; //Append each chunk to the data variable.
  });

  response.on('end', function() {
    var body = JSON.parse(data);
    var comments = body.hits
    for (var i in comments) {
      var title = null;
      if (comments[i].title != null) {
        title = comments[i].story
      }
      if (comments[i].story_title != null) {
        title = comments[i].story_title
      }

      var url = null;
      if (comments[i].url != null) {
        url = comments[i].url
      }
      if (comments[i].story_url != null) {
        url = comments[i].story_url
      }

      // Here I filter out records that have title or url null
      if (url == null || title == null) continue;

      var NewPost = Post({
        created_at: comments[i].created_at,
        title: title,
        url : url,
        author : comments[i].author,
      });
      NewPost.save(function(err, post) {
        if (err) {
          console.log(err);
          response.send(400, 'Bad Request');
        }
      });
    }
  });
}

https.request(urldata, OnResponse).end();
