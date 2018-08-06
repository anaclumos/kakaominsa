var express = require('express');
var http = require('http');

var app = express();

var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



//초기 상태 get
app.get('/keyboard', function(req, res){
  const menu = {
      "type": 'buttons',
      "buttons": ["안녕", "메롱"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});



//카톡 메시지 처리
app.post('/message',function (req, res) {

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    console.log(_obj.content)


    //안녕이라고 입력되었다면...
    if(_obj.content == '안녕')
    {
      //"안녕"이라고 메시지 보내고
      //'누구니' '메롱' 버튼 보여줌
      let message = {
          "message": {
              "text": '안녕'
          },
          "keyboard": {
              "type": "buttons",
              "buttons": [
                  "누구니",
                  "메롱"
              ]
          }
      };

      //      카톡으로 전송
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(message));
    }
    //메롱이라고 입력되었다면
    else if(_obj.content == '메롱')
    {
      //"죽는다."이라고 메시지 보내고
      //'안녕' '누구니' 버튼 보여줌
      let message = {
          "message": {
              "text": '죽는다.'
          },
          "keyboard": {
              "type": "buttons",
              "buttons": [
                  "안녕",
                  "누구니"
              ]
          }
      };
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(message));
    }
    else if(_obj.content == '누구니')
    {
      let message = {
          "message": {
              "text": '난 제니스'
          },
          "keyboard": {
              "type": "buttons",
              "buttons": [
                  "안녕",
                  "메롱"
              ]
          }
      };
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(message));
    }
    //예외 처리...
    //하지만 현재는 버튼 방식이기에 이 루틴을 탈 수가 없다.
    else {
        let message = {
            "message": {
                "text": '못 알아 먹었다...'
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    "안녕",
                    "메롱",
                    "누구니"
                ]
            }
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(message));
    }
});

/*
app.use(bodyParser.json());

app.get('/keyboard', function(req, res) {
	var data = {
  'type': 'buttons',
  'buttons': [
    '가',
    '나',
    '다'
  ]
}
	res.json(data);
});

app.post('/message', function(req, res) {

	const message = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    reply = {}

    console.log("사용자 " + messeage.user_key + "가 " + message.type + "로 된 "+ message.content + "를 보냈습니다.");

	
	var reply = {
		'message': {
			'text' : '기본 응답'
			}
		};
		
	switch(message.content) {
		case '가':
			reply = {
				'message': {
					'text' : '선택 1을 선택하셨네요.'
				}
			}
			break;
		case '나':
			reply = {
				'message': {
					'text' : '선택 2을 선택하셨네요.'
				}
			}
			break;
		case '다':
			reply = {
				'message': {
					'text' : '선택 3을 선택하셨네요.'
				}
			}
			break;
		default:
			reply = {
				'message': {
					'text' : '알 수 없는 명령'
				}
			}
			break;
	}

	res.json(reply);
})
*/

http.createServer(app).listen(8081, '0.0.0.0');

console.log('server up and running at http://0.0.0.0:8081')
