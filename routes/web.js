var models = require("../models");

exports.view = function(req, res){
	var web = req.params.webID
	models.Post
	.find( {"web": web} )
	.exec(afterQuery);
	function afterQuery(err, nodes) {
		if(err) {console.log(err); res.send(500); }
		console.log("length is " + nodes.length);
		res.render('web',{
		"web": web,
		"node": nodes,
		"userID": req.session.userID
	});
	}
	
};


//alternate view for reiteration of design
exports.altview = function(req, res){
	var web = req.params.webID
	models.Post
	.find( {"web": web} )
	.exec(afterQuery);
	function afterQuery(err, nodes) {
		if(err) {console.log(err); res.send(500); }
		res.render('webalt',{
		"web": web,
		"node": nodes,
		"userID": req.session.userID
	});
	}
	
}