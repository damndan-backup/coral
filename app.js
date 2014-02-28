/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var homepage = require('./routes/homepage');
var newWeb = require('./routes/newWeb');
var activity = require('./routes/activity');
var account = require('./routes/account');
var accountSettings = require('./routes/accountSettings');
var web = require('./routes/web');
var post = require('./routes/post'); //for when user clicks into post

//action routes
var login = require('./routes/login');
var createAccount = require('./routes/createAccount');


// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'coral';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here

//regular page routes
app.get('/', index.view);
app.get('/homepage.handlebars/:userID', homepage.view);
app.get('/newWeb.handlebars', newWeb.view);
app.get('/activity.handlebars', activity.view);
app.get('/account.handlebars', account.view);
app.get('/accountSettings.handlebars', accountSettings.view);
app.get('/web.handlebars/:webID', web.view);
app.get('/post.handlebars/:webID/:postID', post.view); //for the view of an individual post
app.get('/webalt.handlebars/:webID', web.altview);
app.get('/login.handlebars', login.view);
app.get('/createAccount.handlebars', createAccount.view);


//action routes
app.get('/addWeb', newWeb.addWeb);
app.get('/addPost/:webID/:parentID', post.addPost);
app.get('/loginFunction', login.loginFunction);
app.get('/create', createAccount.create);
app.get('/logOut', account.logOut);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
