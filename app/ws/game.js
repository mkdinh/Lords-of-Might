
module.exports = function(io){
    var online = [];
    
    io.on('connection', function(socket) {
        // console.log('connected ..')  
        
        socket.player = {};
        
        socket.on('user',function(){
            // create new player object

            player = {
                id: randomInt(1,1000000),
                role: 'player',
                world:{x:randomInt(350,500),y:randomInt(350,500)},
                velocity: {x:0,y:0},
                sprite: randomInt(1,4)
            };
            socket.player = player;
            // console.log(socket.player)
            // start game
            socket.emit('start',{user: player, others: getAllPlayers()})  
            // broadcast new player to all current players
            socket.broadcast.emit('render-user',{new:player})      
            // // emit all players to new player
            // socket.emit('allplayers', getAllPlayers());
        })
        
        socket.on('key-pressed', function(movement){
            if(movement.dir === 'left'){
                socket.player.velocity.x = -100;
            }else if(movement.dir === 'right'){
                socket.player.velocity.x = 100;
            }else if(movement.dir === 'up'){
                socket.player.velocity.y = -100;
            }else if(movement.dir === 'down'){
                socket.player.velocity.y = 100;
            }else if(movement.dir === 'stationary'){
                socket.player.velocity.x = 0;
                socket.player.velocity.y = 0;
            }
            
            socket.player.world.x = movement.worldX;
            socket.player.world.y = movement.worldY;

            // console.log({player: socket.player, dir: movement.dir})
            // broadcast to all player
            io.emit('move', {player: socket.player, dir: movement.dir} )
        })  
        
        socket.on('testing', function(data){
            console.log('test success!, data received: ', data)
        })

        socket.on('disconnect', function(){
            console.log('user',socket.player.id,'disconnected')
            delete io[socket[socket.player.id]]
            io.emit('remove',{id: socket.player.id})
        })

    });

    function getAllPlayers(){
        var players = [];
        // io.sockets.connect is an internal array of the sockets currently connected to the server
        Object.keys(io.sockets.connected).forEach(function(socketID){
            var player = io.sockets.connected[socketID].player;
            if(player.id){
                players.push(player)
            };
        });
        console.log(players)
        return players;
    }

    function randomInt (low,high){
        return Math.floor(Math.random() * (high - low) + low);
    }
}