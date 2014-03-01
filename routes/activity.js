var models = require("../models");

exports.view = function(req, res){
	models.Post
	.find( {} )
	.sort('-date')
	.exec(goToActivity);

	function goToActivity(err, posts) {
		res.render('activity',{
			'posts': posts,
			'userID': req.session.userID
		});
	}
}

