var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  created_at : {
    type : Date,
    required : true
    //"default" : Date.now
  },
  title : {
    type : String,
    required : false
  },
  url : {
    type : String,
    required : false
  },
  author : {
    type : String,
    required : true
  },
});

mongoose.model('Post', postSchema);
