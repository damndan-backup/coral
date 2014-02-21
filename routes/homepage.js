var models = require("../models");

exports.view = function(req, res){
	models.Web
	.find( {} )
	.sort('-date')
	.exec(goToHomepage);

	function goToHomepage(err, webs) {
		res.render('homepage',{
			'webs': webs
		});
	}
};
