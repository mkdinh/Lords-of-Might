
module.exports = function(io){

    lastPlayerID = 0;

    io.on('connection', function(socket) {
        console.log('connected ..')  
        socket.on('newPlayer',function(){
            // create new player object
            socket.player = {
                id: lastPlayerID++,
                x: randomInt(500,800),
                y: randomInt(1000,1200),
                sprite: randomInt(1,4)
            };
            console.log(socket.player)
            // emit all players to new player
            socket.emit('allplayers', getAllPlayers());
            // broadcast new player to all current players
            socket.broadcast.emit('new',socket.player)
            
            socket.on('click', function(data){
                socket.player.x = data.x;
                socket.player.y = data.y;
                // broadcast to all player
                io.emit('move',socket.player)
            });

            socket.on('move', function(dir){
                if(dir === 'left'){
                    socket.player.x -= 100;
                }
                if(dir === 'right'){
                    socket.player.x += 100;
                }
                if(dir === 'up'){
                    socket.player.y -= 100;
                }
                if(dir === 'down'){
                    socket.player.y += 100;
                }if(dir === 'stationary'){
                    socket.player.x = 0;
                    socket.player.y = 0;
                }
                // broadcast to all player
                io.emit('move', {player: socket.player, dir: dir} )
                
            })

            socket.on('disconnect', function(){
                io.emit('remove', socket.player.id)
            })
        });
    })

    function getAllPlayers(){
        var players = [];
        // io.sockets.connect is an internal array of the sockets currently connected to the server
        Object.keys(io.sockets.connected).forEach(function(socketID){
            var player = io.sockets.connected[socketID].player;
            if(player) players.push(player);
        });
        return players;
    }

    function randomInt (low,high){
        return Math.floor(Math.random() * (high - low) + low);
    }
}