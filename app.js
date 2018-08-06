var express = require('express');
var http = require('http');

var app = express();

app.get('/keyboard', function(req, res) {
	var data = {
  'type': 'buttons',
  'buttons': [
    '선택 A',
    '선택 B',
    '선택 C'
  ]
}
	res.json(data);
});

app.post('/message', function(req, res) {
	console.log('LOGGED')
	console.log(req.body)
	console.log('LOGGED')
	//var message = req.body.content;
	//console.log('전달된 메시지입니다: ' + message);

	var msg = {
		'message': {
			'text' : '기본 응답'
			}
		};
		/*
	switch(message) {
		case '선택 1':
			msg = {
				'message': {
					'text' : '선택 1을 선택하셨네요.'
				}
			}
			break;
		case '선택 2':
			msg = {
				'message': {
					'text' : '선택 2을 선택하셨네요.'
				}
			}
			break;
		case '선택 3':
			msg = {
				'message': {
					'text' : '선택 3을 선택하셨네요.'
				}
			}
			break;
		default:
			msg = {
				'message': {
					'text' : '알 수 없는 명령'
				}
			}
			break;
	}
    */
	res.json(msg);
})

http.createServer(app).listen(8081, '0.0.0.0');

console.log('server up and running at http://0.0.0.0:8081')
