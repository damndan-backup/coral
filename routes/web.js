exports.view = function(req, res){
	res.render('web',{
		"webID": req.params.webID
	});
};