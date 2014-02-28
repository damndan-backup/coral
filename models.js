var Mongoose = require('mongoose');


var WebSchema = new Mongoose.Schema({
  "title": String,
  "date": Date,
  "creator": String//Mongoose.Schema.ObjectId
});

var PostSchema = new Mongoose.Schema({
  "message": String,
  "date": Date,
  "creator": String,//Mongoose.Schema.ObjectId,
  "parent": String,//Mongoose.Schema.ObjectId
  "web": String//Mongoose.Schema.ObjectId
});

var UserSchema = new Mongoose.Schema({
	"name": String,
	"password": String,
	"followers": [ { type: String} ],
	"following": [ { type: String} ]
});

exports.Web = Mongoose.model('Web', WebSchema);
exports.Post = Mongoose.model('Post', PostSchema);
exports.User = Mongoose.model('User', UserSchema);

