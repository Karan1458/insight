//Server.js 

var express = require('express');
var app = express();
var morgan = require('morgan'); //Log requests on console.
var Request = require('request');
var bodyParser = require('body-parser');
var http	= require('http');


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

//Start using body Parser : After doing this we can access POST data inside the req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes
app.route('/socket.io')
	.get(function(req, res) {
    		Request({
			method: 'GET',
			uri: '/socket.io/',
			baseUrl: 'http://188.166.36.48:3001/',
			qs: req.query,
			gzip: true,
			function(error, response, body) {
	   			console.log(body.url);
			}
    		}).pipe(res)
	})
	.post(function(req, res) {
		Request({
			method: 'POST',
			uri: '/socket.io/',
			baseUrl: 'http://188.166.36.48:3001/',
			qs: req.query,
			gzip: true,
			function(error, response, body) {
				console.log(body);
			}
		}).pipe(res)
	})

// Start Listening 
app.listen(8080);
console.log('App Listening on your 8080');
