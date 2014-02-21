var models = require("../models");

exports.view = function(req, res){
	var web = req.params.webID
	models.Post
	.find( {"web": web} )
	.exec(afterQuery);
	function afterQuery(err, nodes) {
		if(err) {console.log(err); res.send(500); }
		res.render('web',{
		"web": web,
		"node": nodes
	});
	}
	
};