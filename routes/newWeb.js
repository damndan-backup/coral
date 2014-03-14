var models = require("../models");

exports.view = function(req, res){
	if(req.session.userID == null) {
		res.redirect("/login.handlebars");
	} else {
		res.render('newWeb',{
			'userID': req.session.userID
		});
	}
};

exports.addWeb = function(req, res){
	var date = new Date();
	var newWeb = new models.Web({
		"title": req.query.title,
		"date": date.getTime(),
		"creator": req.session.userID,
		"userID": req.session.userID
	});
	newWeb.save(function afterNewWeb(err, web) {
			if(err) {console.log(err); res.send(500); }
			var newPost = new models.Post({
				"message": web['title'],
				"date": date.getTime(),
				"creator": req.session.userID,
  				"parent": "-1",
  				"web": web['_id']
			});
			newPost.save(function save(err, post){
				if(err) {console.log(err); res.send(500); }
			});
			var newFollow = new models.Follow({
				"web": web['_id'],
				"follower": req.session.userID
			});
				newFollow.save(function afterSaving(err, post) {
					if(err) {console.log(err); res.send(500); }
				});
			var url = "/web.handlebars/" + web['_id'];
			res.redirect(url);
		});
	
	}
