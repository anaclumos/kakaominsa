var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fetch = require('fetch')

/*
request({
  url: "http://stu.kwe.go.kr/sts_sci_md01_001.do?schulCode=K100000414&insttNm=민족사관고등학교&schulCrseScCode=4&schMmealScCode=2",
}, function(error, response, body) {
  console.log(body);
});
*/

request("http://stu.kwe.go.kr/sts_sci_md01_001.do?schulCode=K100000414&insttNm=민족사관고등학교&schulCrseScCode=4&schMmealScCode=2", function(err, res, body) { console.log(body); });

http.get("http://stu.kwe.go.kr/sts_sci_md01_001.do?schulCode=K100000414&insttNm=민족사관고등학교&schulCrseScCode=4&schMmealScCode=2", function(res) {
    console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});

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
          "message" : {"text": "카카오민사 Beta 0.2에 참여하신 것을 환영합니다. 버튼을 눌러 진행해보세요."},
          "keyboard": {"type": "buttons", "buttons": ["오늘 밥 뭐 나와?", "오늘 날씨 어때?", ""]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      case "오늘 밥 뭐 나와?":
        message = {
          "message" : {"text": "<급식 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["오늘 밥 뭐 나와?", "오늘 날씨 어때?", ""]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      case "오늘 날씨 어때?":
        message = {
          "message" : {"text": "<날씨 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["오늘 밥 뭐 나와?", "오늘 날씨 어때?", ""]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
      default:
        message = {
          "message" : {"text": "잘못된 입력입니다."},
          "keyboard": {"type": "buttons", "buttons": ["오늘 밥 뭐 나와?", "오늘 날씨 어때?", ""]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
    }
});

http.createServer(app).listen(8081, "0.0.0.0");
console.log("server up and running at http://0.0.0.0:8081")
