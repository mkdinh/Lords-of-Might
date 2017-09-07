
module.exports = function(io){
    var online = [];
    var server = {};

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

        // when server receive battle request, server sends battle information to the receiver player
        socket.on('battle-request', function(battleInfo){
            server.battleInfo = battleInfo
            socket.to(server.battleInfo.receiver.socketIO.id).emit('battle-requested',battleInfo)

        })

        socket.on('battle-accept', function(battleInfo){
            var room = randomInt(1,10000);
            var initiator_socketID = server.battleInfo.initiator.socketIO.id;

            socket.to(server.battleInfo.initiator.socketIO.id).emit('battle-accepted',{})
            server.battleInfo.room = room;
            
            socket.join(room,function(){
                socket.emit('battle-room',{room:room})
            })
            io.sockets.connected[initiator_socketID].join(room, function(){
                socket.to(server.battleInfo.initiator.socketIO.id).emit('battle-room',{room:room})

            })
       
            // var roster = io.sockets.adapter.rooms[room].sockets;
            // console.log(roster)

        })

        socket.on('battle-decline', function(sprites){
            socket.to(server.battleInfo.initiator.socketIO.id).emit('battle-declined',{})

        })


        // HANDLIGN BATTLE ACTIONS

        socket.on('battleAction', function(data){
            console.log('listen to battle action')
            switch(data.action){
                case 'attack':
                    attackCallback(data)
                    return
                case 'spell':
                    spellCallback(data)
                    return
                case 'potion':
                    potionCallback(data)
                    return
            }
        })

        socket.on('actionCompleted', function(battleInfo){
            console.log('action completed, start next user turn')
            var room = battleInfo.room;
            // console.log(data)
            socket.to(room).emit('your-turn',{});
            })


    });

    function getAllPlayers(){
        var players = [];
        // io.sockets.connect is an internal array of the sockets currently connected to the server
        Object.keys(io.sockets.connected).forEach(function(socketID){
            var player = io.sockets.connected[socketID].player;
            if(!player.id){
                delete io.sockets.connected[socketID]
                console.log('empty object deleted')
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
        console.log('response to an attack request')
        // emit signal to battling player
        var room = data.battleInfo.room;
        io.in(room).emit('battleReaction',data)

    }

    function spellCallback(data){
        // attack logic here with data
        console.log('response to an spell request')
        // emit signal to battling player
        var room = data.battleInfo.room;
        io.in(data.battleInfo.room).emit('battleReaction',data)
    }

    function potionCallback(data){
        // attack logic here with data
        console.log('response to an potion request')
        // emit signal to battling player
        var room = data.battleInfo.room;
        io.in(data.battleInfo.room).emit('battleReaction',data)
    }
}

