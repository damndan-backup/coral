var models = require("../models");

exports.view = function(req, res){
	if(req.session.userID == null) {
		res.redirect("/login.handlebars");
	} else {
		models.Post
		.find( {} )
		.sort('-date')
		.exec(function goToActivity(err, posts) {
			res.render('activity',{
				'posts': posts,
				'userID': req.session.userID
			});
		});
	}
	
}

