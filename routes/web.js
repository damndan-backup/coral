var data = require('../webs.json');

exports.view = function(req, res){
	var web = req.params.webID
	res.render('web',{
		"node": data[web]["posts"]
	});
};