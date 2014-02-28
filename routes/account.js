exports.view = function(req, res){
	res.render('account',{
	});
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