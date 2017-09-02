
module.exports = function(io){
    var online = [];
    var player = {};
    
    io.on('connection', function(socket) {
        console.log('connected ..')  
        socket.on('user',function(){
            // create new player object

            player = {
                id: randomInt(1,1000000),
                x: randomInt(330,500),
                y: randomInt(330,500),
                sprite: randomInt(1,4)
            };
            socket.player = player;

            // start game
            socket.emit('start',{user: player, others: getAllPlayers()})  
            // broadcast new player to all current players
            socket.broadcast.emit('render-user',{new:player})      
            // emit all players to new player
            socket.emit('allplayers', getAllPlayers());
        })
        
        socket.on('key-pressed', function(data){

            if(data.dir.dir === 'left'){
                player.x = -100;
            }else if(data.dir.dir === 'right'){
                player.x = 100;
            }else if(data.dir.dir === 'up'){
                player.y = -100;
            }else if(data.dir.dir === 'down'){
                player.y = 100;
            }else if(data.dir.dir === 'stationary'){
                player.x = 0;
                player.y = 0;
            }
    
            // broadcast to all player
            // console.log({player: player, dir: data.dir})
            io.emit('move', {player: player, dir: data.dir} )
        })  
        
        socket.on('testing', function(data){
            console.log('test success!, data received: ', data)
        })


        socket.on('disconnect', function(){
            console.log('user',player.id,'disconnected')
            io.emit('remove', player.id)
        })
    });

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