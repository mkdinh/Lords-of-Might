module.exports = function(io){

    var online = [];
    var server = {};

    io.on('connection', function(client) {  
        console.log('Client connected...');
        
        client.on('message', function(message) {
            client.emit('messages', message);
            io.sockets.emit('broadcast', message)  
        });
    
    });
}