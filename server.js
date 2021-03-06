var express = require('express');
var app = express();
var routes = require('server/routes');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

// TODO: add index.jade file to remove inline html code

app.all('/*', function(req, res) {
	res.send('\
		<!DOCTYPE html>\
		<html lang="en">\
			<head>\
				<meta charset="UTF-8" />\
				<title>MEAN Todo App</title>\
				<base href="/" />\
			</head>\
			<body>\
				<div ui-view></div>\
				<script src="bundle.js"></script>\
			</body>\
		</html>\
	')
});

app.listen(port, function() {
	console.log('Server is running on port ' + port);
});