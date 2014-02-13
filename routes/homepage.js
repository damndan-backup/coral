var webs = require('../webs.json');

exports.view = function(req, res){
	res.render('homepage',{
		'webs': webs
	});
};