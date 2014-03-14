var models = require("../models");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;


exports.view = function(req, res){
	if(req.session.userID == null) {
		res.redirect("/login.handlebars");
	} else {
		models.User
		.find({"_id": new ObjectId(req.session.userID)})
		.exec(goToAccount);
		function goToAccount(err, user) {
			if(err) {console.log(err); res.send(500); }
			res.render('account',{
			"name": user[0]['name'],
			"userID":req.session.userID
			});
		}
	}
	
};

exports.follow = function(req, res){
	var follower = req.session.userID;
	var followee = req.params.userID;
	var newFollow = new models.Follow({
			"follower": follower,
  			"followee": followee 
		});

			newFollow.save(afterSaving);

	function afterSaving(err, user) {
		if(err) {console.log(err); res.send(500); }
		res.redirect("account.handlebars/" + followee);
	}
}

exports.unfollow = function(req, res){
	var follower = req.session.userID;
	var followee = req.params.userID;
	models.Post
	.find({"follower": follower, "followee": followee})
	.remove()
	.exec(afterRemove);
	function afterRemove(err, post) {
		if(err) {console.log(err); res.send(500); }
		res.redirect("account.handlebars/" + followee);
	}
}

exports.logOut = function(req, res){
	req.session.userID = null;
	res.redirect("login.handlebars");
}