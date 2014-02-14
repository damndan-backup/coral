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

	var num = webs.length - 1;
	var webID = num.toString();

	res.render('newPost',{
		"webID": webID,
		"parentID": "0"
	})
};