

module.exports = function(io){

    io.on('connection', function(client) {  
        // HANDLING GLOBAL MESSAGING
        // -----------------------------------------------------------------
        client.on('global-message', function(message) {
            // client.emit('messages', message);
            io.sockets.emit('global-message', message)  
        });

        // HANDLING PRIVATE MESSAGING
        // -----------------------------------------------------------------
    
    });
}