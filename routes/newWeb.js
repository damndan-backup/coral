var models = require("../models");

exports.view = function(req, res){
	// if(!req.session.uname) {
	// 	var uname = getUname();
	// 	req.session.uname = uname;
	// }
	res.render('newWeb',{
	});
};

exports.addWeb = function(req, res){
	var date = new Date();
	var newWeb = new models.Web({
		"title": req.query.title,
		"date": date.getTime(),
		"creator": req.session.userID,
		"userID": req.session.userID
	});
	newWeb.save(afterSaving);
	
	
		
		models.Web
		.find( {} )
		.sort('-date')
		.exec(goToWeb);
		function goToWeb(err, web) {
			if(err) {console.log(err); res.send(500); }
			var newPost = new models.Post({
				"message": "Create New Post!",
				"date": date.getTime(),
				"creator": req.session.userID,
  				"parent": "-1",
  				"web": web[0]['id']
			});
			newPost.save(afterSaving);
			var url = "/web.handlebars/" + web[0]['id'];
			res.redirect(url);
		}
		function afterSaving(err, web) {
			if(err) {console.log(err); res.send(500); }
		}
};