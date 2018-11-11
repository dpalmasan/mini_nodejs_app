require('./api/data/db.js');
var express = require("express");
var request = require("request");
var schedule = require('node-schedule');
var prettydate = require("pretty-date");
var path = require('path');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var app = express();
var https = require('https');
require('./api/data/db.js');

var routes = require('./api/routes');

// Define port to run on
app.set('port', 3000);

// Defaults to the views directory in the app root dir
app.set('views', './views');

// Define view engine
app.set('view engine', 'pug');

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

// Add some routing
app.use('/api', routes);

app.get("/", function (req, res) {
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
          .json(err)
      } else {
        console.log("Found posts", posts.length);

        // Adding the pretty date attribute to pass to render.
        for (i in posts) {
          posts[i].pretty_date = prettydate.format(posts[i].created_at);
        }
        res.render('index', { posts : posts} )
      }
    });
})

// Job Scheduling to Connect to API and insert to MongoDB
var j = schedule.scheduleJob('1 * * * *', function(){//run every hour when minute = 1
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
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listening port ' + port);
});
