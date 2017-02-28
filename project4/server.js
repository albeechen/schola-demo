var express = require('express');
var app = express();

//
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	console.log("ENTER GET");
	res.status = 200;
	res.send({message: 'test'});
});

app.listen('8888', () => {
	console.log("server start");
})