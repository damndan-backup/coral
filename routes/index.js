exports.view = function(req, res){
	res.render('index',{
	});
};

exports.view2 = function(req, res){
	res.render('index',{
		'altView': true
	});
};