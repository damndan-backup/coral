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

exports.invite = function(req, res){
	var web = req.params.webID;
	var follower = req.query.follower;

	console.log(follower);

	models.User
	.find( {"name": follower} )
	.exec(afterQuery);
	function afterQuery(err, user) {
		if(err) {console.log(err); res.send(500); }
		if(user.length > 0) {
			console.log("found");
			console.log(user[0]['_id']);
			var newFollow = new models.Follow({
				"web": web,
				"follower": user[0]['_id']
			});
				newFollow.save(function afterSaving(err, post) {
					if(err) {console.log(err); res.send(500); }
					var url = "web.handlebars/" + web;
					res.redirect(url);
				});
		} else {
			console.log("not found");
			var url = "web.handlebars/" + web;
			res.redirect(url);
		}
	}
}