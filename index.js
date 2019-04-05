var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var port = process.env.PORT || 2005;

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

http.listen(port);
