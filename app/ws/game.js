
module.exports = function(io){
    io.on('connection', function(client) {  
        console.log('User connected');  
        
        client.on('joinGame', function(user){
            // var user_id = user.user_id;

            // grab player data with id with sequelize

            // return data to client;
            client.emit('myChar',{});

            // broadcast player data to other players
            client.broadcast.emit('newChar', {players: 'newplayer'});
        });
        // emit player position to other players
        client.on('newPos', function(position){
            client.broadcast.emit('clientPos', position)
        })
    })
}