var models = require("../models");
exports.view = function(req, res){
	res.render('newPost',{
	});
};

exports.addPost = function(req, res){
	var webID = req.params.webID;
	var parentID = req.params.parentID;
	var newPost = new models.Post({
		"message": req.query.message,
		"date": Date.now,
		"creator": "me",
  		"parent": parentID,
  		"web": webID
	});

	newPost.save(afterSaving);
	function afterSaving(err, web) {
		if(err) {console.log(err); res.send(500); }
		res.send();
	}
	
	var url = "web.handlebars/" + webID;
	res.redirect(url);
};