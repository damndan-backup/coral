var models = require("../models");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

exports.view = function(req, res){
	res.render('createAccount',{
			
		});
}
exports.create = function(req, res){
	var name = req.query.name;
	var password = req.query.password;

	var newUser = new models.User({
			"name": name,
			"password": password
		});

		newUser.save(function afterSaving(err, user) {
			if(err) {console.log(err); res.send(500); }
			var userID = user['_id'];
			req.session.userID = userID;
			url = /homepage.handlebars/ + userID;
			res.redirect(url);
	});

	
}