var models = require("../models");
var mongoose = require("mongoose");
exports.view = function(req, res){
	var webID = req.params.webID;
	var parentID = mongoose.Types.ObjectId(req.params.parentID);

	models.Post
	.find( {"_id": parentID} )
	.exec(goToPosts);
	function goToPosts(err, post) {
		if(err) {console.log(err); res.send(500); }
		console.log("post is " + post);
		res.render('post',{
			"webID": req.params.webID,
			"parentID": req.params.parentID,
			"message": post[0]['message']
		});
	}
};

exports.addPost = function(req, res){

	var webID = req.params.webID;
	var parentID = req.params.parentID;
	var date = new Date();
	var message = req.query.message;
	
	if(parentID == -1 && message != null) {
			
			models.Post
			.find({"web": webID, "parent": -1})
			.update({"parent": 0, "message": message})
			.exec(afterUpdate);
			function afterUpdate(err, post) {
				if(err) {console.log(err); res.send(500); }
				res.send();
			}
		

	} else {
		if(message == null) message = "Create New Post!";
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
			res.send();
		}
	}
		var url = "web.handlebars/" + webID;
		res.redirect(url);
}