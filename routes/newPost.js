var webs = require("../webs.json");
exports.view = function(req, res){
	res.render('newPost',{
	});
};

exports.addPost = function(req, res){
	var webID = req.params.webID;
	var parentID = req.params.parentID;

	var newPost = {
		"id": webs[webID]['posts'].length + 1,
		"message": req.query.message,
		"parent": parentID
	};
	webs[webID]['posts'].push(newPost)
	res.redirect('web.handlebars/' + webID);
};