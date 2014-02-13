var webs = require("../webs.json");

exports.view = function(req, res){
	// if(!req.session.uname) {
	// 	var uname = getUname();
	// 	req.session.uname = uname;
	// }
	res.render('newWeb',{
	});
};

exports.addWeb = function(req, res){
	var newWeb = {
		"id": webs.length,
		"title": req.query.title,
		"posts": [
		]
	};
	webs.push(newWeb)
	res.render('newPost',{
		"webID": webs.length - 1,
		"parentID": "0"
	})
};