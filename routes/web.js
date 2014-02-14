var data = require('../webs.json');

exports.view = function(req, res){
	res.render('web',{
		"webID": req.params.webID
		"node" : data[req.params.webID]['posts']
	});
};

