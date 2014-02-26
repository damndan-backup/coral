var models = require("../models");

exports.view = function(req, res){
	var web = req.params.webID
	models.Post
	.find( {"web": web} )
	.exec(afterQuery);
	function afterQuery(err, nodes) {
<<<<<<< HEAD
=======
		if(err) {console.log(err); res.send(500); }
>>>>>>> e4feb5882132c53f8800e77135f98bf5c3a3858a
		res.render('web',{
		"web": web,
		"node": nodes
	});
	}
	
};