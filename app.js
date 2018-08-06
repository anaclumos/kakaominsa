// Calles the express module.
var express = require('express');

// Calles the http module.
var http = require('http');

var app = express();

app.get('/keyboard', function(req, res) {
	var data = {
  "type": "buttons",
  "buttons": [
    "선택 1",
    "선택 2",
    "선택 3"
  ]
}
	res.json(data);
});

http.createServer(app).listen(9090, "0.0.0.0");

console.log('server up and running at http://0.0.0.0:8080')
