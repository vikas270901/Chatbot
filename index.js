var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
//app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/main.html');
});
var client=0;
io.on('connection', function(socket){
	socket.on('auth', function(tdata, callback){
		if(users.indexOf(tdata) != -1){callback(false);}
		else{
			callback(true);
			socket.name = tdata;
			var thedata = users.push(socket.name);
			updatelist();
		}
	});

function updatelist(){
	io.sockets.emit('user', users);
}
	client++;//console.log(client);
	var dat="1 Connected, "+client+" Clients Online...";
		io.sockets.emit('message2', dat);
	socket.on("send message", function(data){
		io.sockets.emit("new message", {data:data, name:socket.name});
	});
	socket.on('disconnect', function(){
		client--;//console.log(client);
		if(!socket.name) return;
		users.splice(users.indexOf(socket.name),1);
		var dat="1 dropped "+client+" Clients Online...";
		io.sockets.emit('message2', dat);
		updatelist();
	});
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
