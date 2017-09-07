
module.exports = function(io){

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
                sprite: randomInt(6,6),
                socketIO: {id: socket.id}
            };
            socket.player = player;
            // console.log(Object.keys(io.sockets.connected))
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
                socket.player.velocity.y = 0;
            }else if(movement.dir === 'right'){
                socket.player.velocity.x = 100;
                socket.player.velocity.y = 0;
            }else if(movement.dir === 'up'){
                socket.player.velocity.x = 0;
                socket.player.velocity.y = -100;
            }else if(movement.dir === 'down'){
                socket.player.velocity.x = 0;
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
            // var socketID = socket.player.socketIO.id;
            // console.log(socketID)
            // io.sockets.connected
            io.emit('remove',{id: socket.player.id})
        })
    });

    function getAllPlayers(){
        var players = [];
        // io.sockets.connect is an internal array of the sockets currently connected to the server
        Object.keys(io.sockets.connected).forEach(function(socketID){
            var player = io.sockets.connected[socketID].player;
            if(!player.id){
                delete io.sockets.connected[socketID]
                // console.log('empty object deleted')
            }else{
                players.push(player)       
            }
        });

        // console.log(players)
        return players;
    }

    function randomInt (low,high){
        return Math.floor(Math.random() * (high - low) + low);
    }

    function attackCallback(data){
        // attack logic here with data
        // console.log('response to an attack request')
        // emit signal to battling player
        var room = data.battleInfo.room;
        io.in(room).emit('battleReaction',data)

    }

    function spellCallback(data){
        // attack logic here with data
        // console.log('response to an spell request')
        // emit signal to battling player
        var room = data.battleInfo.room;
        io.in(data.battleInfo.room).emit('battleReaction',data)
    }

    function potionCallback(data){
        // attack logic here with data
        // console.log('response to an potion request')
        // emit signal to battling player
        var room = data.battleInfo.room;
        io.in(data.battleInfo.room).emit('battleReaction',data)
    }
}

