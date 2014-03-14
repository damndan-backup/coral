var models = require("../models");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
exports.view = function(req, res){
	if(req.session.userID == null) {
		res.redirect("/login.handlebars");
	} else {
		models.Follow
		.find( {"follower": req.session.userID} )
		.exec(function goToHomepage(err, follows) {
			var webs = [];
			console.log("follows are " + follows);
			for(var i = 0; i < follows.length; i++) {
				console.log("i is " + i);
				var currID = new ObjectId(follows[i]['web']);
				console.log("currID is " + currID);
				models.Web
				.find( {"_id": currID} )
				.exec(function afterQuery(err, web) {
					console.log("currweb is " + web);
					webs.push({'id': web[0]['_id'], 'title': web[0]['title']});
				})
			}
			res.render('homepage',{
				'webs': webs,
				'userID': req.session.userID
			});
		});
	}
};