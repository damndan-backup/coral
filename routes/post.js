var models = require("../models");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
exports.view = function(req, res){
	var webID = req.params.webID;
	var postID = req.params.postID;
	var date = new Date();
	var message = req.query.message;


	models.Post
	.find( {"_id": new ObjectId(postID)} )
	.exec(goToPosts);
	function goToPosts(err, post) {
		if(err) {console.log(err); res.send(500); }
		console.log("current post is " + post);
		res.render('post',{
			"webID": webID,
			"postID": postID,
			"message": post[0]['message']
		});
	}
};

exports.addPost = function(req, res){
	var webID = req.params.webID;
	var parentID = req.params.parentID;
	var date = new Date();
	var message = req.query.message;
	
	models.Post
	.find({"web": webID, "parent": "-1"})
	.exec(checkStart);
	function checkStart(err, posts) {
		if(posts.length != 0) {
			console.log("message is " + message);
			models.Post
			.find({"web": webID, "parent": "-1"})
			.remove()
			.exec(afterUpdate);
			function afterUpdate(err, post) {
				if(err) {console.log(err); res.send(500); }
				console.log("updated post is " + post);
				res.send();
			}
			parentID = 0;
		} 
		var newPost = new models.Post({
			"message": message,
			"date": date.getTime(),
			"creator": "me",
  			"parent": parentID,
  			"web": webID
		});

			newPost.save(afterSaving);
			function afterSaving(err, post) {
				if(err) {console.log(err); res.send(500); }
				console.log("new post is " + post);
				var url = "web.handlebars/" + webID;
				res.redirect(url);
			}
			res.send();
	}

}