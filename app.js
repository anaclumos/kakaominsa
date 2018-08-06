var express = require('express');
var http = require('http');

var app = express();

app.get('/keyboard', function(req, res) {
	var data = {
  'type': 'buttons',
  'buttons': [
    '선택 1',
    '선택 2',
    '선택 3'
  ]
}
	res.json(data);
});

app.post('/message', function(req, res) {
	var message = req.body.content;
	console.log('전달된 메시지입니다: ' + message);

	var respond = {};

	switch(message) {
		case '선택 1':
			respond = {
				'message': {
					'text' : '선택 1을 선택하셨네요.'
				}
			}
			break;
		case '선택 2':
			respond = {
				'message': {
					'text' : '선택 2을 선택하셨네요.'
				}
			}
			break;
		case '선택 3':
			respond = {
				'message': {
					'text' : '선택 3을 선택하셨네요.'
				}
			}
			break;
		default:
			respond = {
				'message': {
					'text' : '알 수 없는 명령'
				}
			}
			break;
	}
	res.json(respond);
})

http.createServer(app).listen(8081, '0.0.0.0');

console.log('server up and running at http://0.0.0.0:8081')
