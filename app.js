var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------
// Initial get
app.get("/keyboard", function(req, res){
  const menu = {
              "type": "buttons",
              "buttons": [
                  "버튼 1",
                  "버튼 2",
                  "버튼 3"
              ]
      };
  res.set({
      "content-type": "application/json"
  }).send(JSON.stringify(menu));
});

//----------------------------------
//Kakaotalk message handling engine
app.post("/message",function (req, res) {

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    console.log(_obj.content)


    if(_obj.content == "버튼 1")
    {
      let message = {
          "message": {
              "text": "버튼 1을 누르셨습니다."
          },
          "keyboard": {
              "type": "buttons",
              "buttons": [
                  "버튼 1",
                  "버튼 2",
                  "버튼 3"
              ]
          }
      };

      res.set({
          "content-type": "application/json"
      }).send(JSON.stringify(message));
    }

    else if(_obj.content == "버튼 2")
    {
      let message = {
          "message": {
              "text": "버튼 2를 누르셨습니다."
          },
          "keyboard": {
              "type": "buttons",
              "buttons": [
                  "버튼 1",
                  "버튼 2",
                  "버튼 3"
              ]
          }
      };
      res.set({
          "content-type": "application/json"
      }).send(JSON.stringify(message));
    }

    else if(_obj.content == "버튼 3")
    {
      let message = {
          "message": {
              "text": "버튼 3을 누르셨습니다."
          },
          "keyboard": {
              "type": "buttons",
              "buttons": [
                  "버튼 1",
                  "버튼 2",
                  "버튼 3"
              ]
          }
      };
      res.set({
          "content-type": "application/json"
      }).send(JSON.stringify(message));
    }

    else {
        let message = {
            "message": {
                "text": "모르는 입력입니다."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    "버튼 1",
                    "버튼 2",
                    "버튼 3"
                ]
            }
        };
        res.set({
            "content-type": "application/json"
        }).send(JSON.stringify(message));
    }
});

http.createServer(app).listen(8081, "0.0.0.0");

console.log("server up and running at http://0.0.0.0:8081")
