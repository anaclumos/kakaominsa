var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fetch = require('fetch')
var fs = require('fs');
var PythonShell = require('python-shell');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------
// Initial get
app.get("/keyboard", function(req, res){
  const menu = {
              "type": "buttons",
              "buttons": ["시작!"]
      };
  res.set({
      "content-type": "application/json"
  }).send(JSON.stringify(menu));
});

//----------------------------------
//Kakaotalk message handling engine
app.post("/message",function (req, res) {

    const _obj = {
        user_key : req.body.user_key,
        type     : req.body.type,
        content  : req.body.content
    };

    console.log(_obj.user_key + " has a sent a message of type " + _obj.type + ", and which is, \"" + _obj.content + "\"");
    var bionic = new PythonShell('Bionic.py');
    bionic.on('_obj.content', function (message) {
      res.set({"content-type": "application/json"}).send(JSON.stringify(message));
    });
});

http.createServer(app).listen(8081, "0.0.0.0");
console.log("Fairy up and running at http://0.0.0.0:8081")
