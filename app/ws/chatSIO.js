

const models = require('../models');
const Message = models.Message;

module.exports = function(io){

    io.on('connection', function(client) {  
        // HANDLING GLOBAL MESSAGING
        // -----------------------------------------------------------------
          
        client.on('global-message', function(message) {
            console.log('global')
                io.sockets.emit('global-message', message)  
        });

        client.on('private-message', function(message) {
            console.log('private')
            io.in(message.room).emit('private-message', message)  
    });

        // HANDLING PRIVATE MESSAGING
        // -----------------------------------------------------------------
    
    });
}