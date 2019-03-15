var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/main.html');
});
var client=0;
io.on('connection', function(socket){
	client++;console.log(client);
	socket.on("send message", function(data){
		io.sockets.emit("new message", data);
	});
	socket.on('disconnect', function(){
		client--;console.log(client);
		var dat="One client dropped "+client+" Clients Connected...";
		io.sockets.emit('new message', dat);
	})
});

http.listen(3000, function(){
  console.log('listening at 3000...');
});

// var express = require("express");
// var app = express();
// var io = require("socket.io")(socketio);

// app.use(express.static(__dirname+'/public'));

// //app.set("view engine", "ejs");

// app.get("/", function(req, res){
// 	res.sendfile(__dirname+'/public/main.html');
// });

// io.on('connection', function(socket){
// 	console.log("Connection Established..");
// 	socket.on('disconnect', function(){
// 		console.log("disconnected");
// 	});
// });

// var socketio = app.listen(2003, function(req, res){
// 	console.log("Server is running at 2003...");
// });
