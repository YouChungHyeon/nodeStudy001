var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request, response) {
    fs.readFile('HTMLPage.html', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(data);
    });
}).listen(4000, function() {
    console.log('http://127.0.0.1:4000');
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
    
    socket.on('rint', function(data) {
        console.log('Client Send Data : ' + data);

        socket.emit('smart', data);
    })
});