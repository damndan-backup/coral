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
		"creator": "me"
	});
	newWeb.save(afterSaving);
	function afterSaving(err, web) {
		if(err) {console.log(err); res.send(500); }
		
		models.Web
		.find( {} )
		.sort('-date')
		.exec(goToWeb);
		function goToWeb(err, web) {
			if(err) {console.log(err); res.send(500); }
			var url = "/addPost/" + web[0]['id'] + "/-1";
			
			res.redirect(url);
		}
	}
};