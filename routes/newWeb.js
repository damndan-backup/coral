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
	var newWeb = new models.Web({
		"title": req.query.title,
		"date": Date.now,
		"creator": "me"
	});
	newWeb.save(afterSaving);
	function afterSaving(err, web) {
		if(err) {console.log(err); res.send(500); }
		res.send();
	}
	models.Web
	.find( {} )
	.sort('-date')
	.exec(goToWeb);

	function goToWeb(err, web) {
		var url = "web.handlebars/" + web[0]['id'];
		res.redirect(url);
	}
};