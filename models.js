var Mongoose = require('mongoose');


var WebSchema = new Mongoose.Schema({
  "title": String,
  "date": Date,
  "creator": { type: Schema.Types.ObjectId, ref: 'User' }
});

var PostSchema = new Mongoose.Schema({
  "message": String,
  "date": Date,
  "creator": { type: Schema.Types.ObjectId, ref: 'User' }
  "parent": { type: Schema.Types.ObjectId, ref: 'Post' },
  "web": { type: Schema.Types.ObjectId, ref: 'Web' }
});

varUserSchema = new Mongoose.Schema({
	"name": String,
	"password": String
	//Followers and Following
	//
});

exports.Web = Mongoose.model('Web', WebSchema);
exports.Post = Mongoose.model('Post', PostSchema);
exports.User = Mongoose.model('User', UserSchema);