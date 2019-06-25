var fs = require('fs');

var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(52273, function(){
    console.log('Server is running .. http://127.0.0.1:52273');
});


//웹서버 이벤트를 연결합니다. 
server.on('request', function(request, response) {
    fs.readFile('HTMLRoomPage.html', function(error, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(data);
    });
});

//소켓 서버 이벤트를 연결 합니다. 
io.sockets.on('connection', function(socket){
    var roomName = null;

    socket.on('join', function(data) {
        console.log("!#!#!#!#!#! : " +data);
        roomName = data;
        socket.join(data);
    });

    socket.on('message', function(data) {
        io.sockets.in(roomName).emit('message', 'test');
    });
});