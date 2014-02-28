exports.view = function(req, res){
	res.render('activity',{
		"userID": req.session.userID
	});
};