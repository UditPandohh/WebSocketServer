
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
  });

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/post', function(req, res){
    var hostname = req.headers['hostname']
    io.sockets.emit('chat message', hostname );
    res.send('successfully sent : ' + hostname )
  });
 

http.listen(3000, function(){
  console.log('listening on *:3000');
});