var models = require("../models");

exports.view = function(req, res){
	if(req.session.userID == null) {
		res.redirect("/login.handlebars");
	} else {
		models.Web
		.find( {"follower": req.session.userID} )
		.sort('-date')
		.exec(function goToHomepage(err, webs) {
			res.render('homepage',{
				'webs': webs,
				'userID': req.session.userID
			});
		});
	}
};

exports.view2 = function(req, res){
	models.Web
	.find( {} )
	.sort('-date')
	.exec(function goToHomepage(err, webs) {
		res.render('homepage',{
			'webs': webs,
			'userID': req.session.userID,
			'makeNewColor': true
		});
	});
};
