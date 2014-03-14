var models = require("../models");

exports.view = function(req, res){
	if(req.session.userID == null) {
		res.redirect("/login.handlebars");
	} else {
		var web = req.params.webID
		models.Post
		.find( {"web": web} )
		.exec(afterQuery);
		function afterQuery(err, nodes) {
			if(err) {console.log(err); res.send(500); }
			console.log("length is " + nodes.length);
			res.render('web',{
			"web": web,
			"node": nodes,
			"userID": req.session.userID
		});
		}
	}
	
};


//alternate view for reiteration of design
exports.altview = function(req, res){
	var web = req.params.webID
	models.Post
	.find( {"web": web} )
	.exec(afterQuery);
	function afterQuery(err, nodes) {
		if(err) {console.log(err); res.send(500); }
		res.render('webalt',{
		"web": web,
		"node": nodes,
		"userID": req.session.userID
	});
	}
	
}

exports.invite = function(req, res){
	var web = req.params.webID;
	var follower = req.query.follower;

	models.Follow
	.find( {"name": follower} )
	.exec(afterQuery);
	function afterQuery(err, follower) {
		if(err) {console.log(err); res.send(500); }
		if(follower.size > 0) {
			var newFollow = new models.Follow({
				"web": web,
				"follower": follower['_id']
			});
				newFollow.save(function afterSaving(err, post) {
					if(err) {console.log(err); res.send(500); }
					var url = "web.handlebars/" + webID;
					res.redirect(url);
				});
		} else {
			var url = "web.handlebars/" + webID;
			res.redirect(url);
		}
	}
}