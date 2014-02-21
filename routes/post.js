var models = require("../models");
exports.view = function(req, res){
	res.render('post',{
		"webID": req.params.webID,
		"parentID": req.params.parentID
	});
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