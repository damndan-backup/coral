var models = require("../models");
exports.view = function(req, res){
	res.render('post',{
		"webID": req.params.webID;
		"parentID": req.params.parentID;
	});
};

exports.addPost = function(req, res){

	var webID = req.params.webID;
	var parentID = req.params.parentID;
	var date = new Date();
	var newPost = new models.Post({
		"message": req.query.message,
		"date": date.getTime(),
		"creator": "me",
  		"parent": parentID,
  		"web": webID
	});

	newPost.save(afterSaving);
	function afterSaving(err, web) {
		if(err) {console.log(err); res.send(500); }
		var url = "web.handlebars/" + webID;
		res.redirect(url);
	}