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
                  "시작하기"
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
        user_key : req.body.user_key,
        type     : req.body.type,
        content  : req.body.content
    };

    console.log(_obj.user_key + "가 " + _obj.type + "로 된, \"" + _obj.content + "\"라는 문자를 보냈습니다.")
    
    var message = {}

    switch (_obj.content) {
      case "시작하기":
        message = {
          "message" : {"text": "카카오민사 Beta 0.1.7에 참여하신 것을 환영합니다.\n버튼을 눌러 진행해보세요."},
          "keyboard": {"type": "buttons", "buttons": ["급식 정보", "날씨 정보", "일정"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      case "급식 정보":
        message = {
          "message" : {"text": "<급식 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["급식 정보", "날씨 정보", "일정"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      case "날씨 정보":
        message = {
          "message" : {"text": "<날씨 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["급식 정보", "날씨 정보", "일정"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      case "일정":
        message = {
          "message" : {"text": "<일정 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["급식 정보", "날씨 정보", "일정"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      default:
        message = {
          "message" : {"text": "잘못된 입력입니다."},
          "keyboard": {"type": "buttons", "buttons": ["급식 정보", "날씨 정보", "일정"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
    }
});

http.createServer(app).listen(8081, "0.0.0.0");
console.log("server up and running at http://0.0.0.0:8081")
