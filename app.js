var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var fetch = require('fetch');
var mealURL = "http://juneyoung.kr/api/school-meal/meal_api.php?countryCode=stu.kwe.go.kr&schulCode=K100000414&insttNm=민족사관고등학교&schulCrseScCode=4&schMmealScCode="

const port = process.env.PORT || 8000;

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
function returnMealInfo(time){
    request({
      url: url + time,
      json: true
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
          var string = JSON.stringify(body);
           var v = JSON.parse(string);
          message = {
            "message" : {"text": v["날짜"] + "의 " + v["급식 종류"] + " 메뉴는 " + v["메뉴"] + "입니다."},
            "keyboard": {"type": "buttons", "buttons": ["Return to main"]}
           };
          res.set({"content-type": "application/json"}).send(JSON.stringify(message));
          break; 
      }
      else {
        message = {
            "message" : {"text": "API 에러가 발생한 것 같아요 ㅠ"},
            "keyboard": {"type": "buttons", "buttons": ["Return to main"]}
           };
          res.set({"content-type": "application/json"}).send(JSON.stringify(message));
          break;
      }
  })
}

app.post("/message",function (req, res) {

    const _obj = {
        user_key : req.body.user_key,
        type     : req.body.type,
        content  : req.body.content
    };

    var mainButtons = ["아침 메뉴", "점심 메뉴", "저녁 메뉴", "내일 아침기 갈까? (미세먼지)", "날씨에 대해 알려줘!", "About 민사요정"]
    var message = {}

    switch (_obj.content) {

      case "시작!":
        message = {
          "message" : {"text": "민사요정 v0.3 베타 테스트에 참여하신 것을 환영합니다. 버튼을 눌러 진행해보세요."},
          "keyboard": {"type": "buttons", "buttons": mainButtons}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;

      case "Return to main":
        message = {
          "message" : {"text": "🙌"},
          "keyboard": {"type": "buttons", "buttons": mainButtons}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;

      case "아침 메뉴":
        returnMealInfo(1);
      case "점심 메뉴":
        returnMealInfo(2);
      case "저녁 메뉴":
        returnMealInfo(3);

      case "내일 아침기 갈까? (미세먼지)":
        message = {
          "message" : {"text": "<날씨 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["Return to main"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;


      case "날씨에 대해 알려줘!":
        message = {
          "message" : {"text": "<날씨 정보가 들어갈 곳>"},
          "keyboard": {"type": "buttons", "buttons": ["Return to main"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;

      case "About 민사요정":
        message = {
          "message" : {"text": "민사요정 v0.4 beta © Sunghyun Cho"},
          "keyboard": {"type": "buttons", "buttons": ["Return to main"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;

      default:
        message = {
          "message" : {"text": "잘못된 입력입니다."},
          "keyboard": {"type": "buttons", "buttons": ["Return to main"]}
         };
        res.set({"content-type": "application/json"}).send(JSON.stringify(message));
        break;
    }
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});
