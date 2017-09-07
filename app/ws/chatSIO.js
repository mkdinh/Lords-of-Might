module.exports = function(io){

    
    io.on('connection', function(client) {  
        console.log('Client connected...');
        
        client.on('group-message', function(message) {
            client.emit('messages', message);
            io.sockets.emit('broadcast', message)  
        });
    
    });
}