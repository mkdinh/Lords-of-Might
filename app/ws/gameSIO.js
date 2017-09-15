
var db = require('../models');

module.exports = function(io){

    var online = [];
    var server = {};

    io.on('connection', function(socket) {
        // console.log('connected ..')  
        
        socket.player = {};
        socket.on('user',function(user){
            // create new player object
            // setTimeout(function(){console.log(user.equipments)},500)
            user.socketIO = {id: socket.id}
            socket.player = user;
            // console.log(Object.keys(io.sockets.connected))
            // start game
            socket.emit('start',{user: user, others: getAllPlayers()})  
            // broadcast new player to all current players
            socket.broadcast.emit('render-user',{new: user})      
            // // emit all players to new player
            // socket.emit('allplayers', getAllPlayers());
        })

        
        socket.on('key-pressed', function(movement){
            // console.log(Object.keys(io.sockets.connected).length)
            if(Object.keys(socket.player).length !== 0){
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
                    if(Object.keys(socket.player).length !== 0){
                        socket.player.velocity.x = 0;
                        socket.player.velocity.y = 0;
                    }
                }

                socket.player.world.x = movement.worldX;
                socket.player.world.y = movement.worldY;
                
                if(socket.player.world.state !== movement.state){
                    socket.player.world.state = movement.state
                }
            }
            // console.log({player: socket.player, dir: movement.dir})
            // broadcast to all player
            io.emit('move', {player: socket.player, dir: movement.dir, state: movement.state} )
        })
        
        socket.on('change-state', function(user){
            // db.Game_State.update({})
            // broadcast new player to all current players
            socket.broadcast.emit('player-changed-state',user)
            socket.emit('change-state', user)  
        })
        
        socket.on('testing', function(data){
            console.log('test success!, data received: ', data)
        })

        // when server receive battle request, server sends battle information to the receiver player
        socket.on('battle-request', function(battleInfo){
            server.battleInfo = battleInfo
            socket.to(server.battleInfo.receiver.socketIO.id).emit('battle-requested',battleInfo)

        })

        socket.on('battle-accept', function(battleInfo){
            var room = randomInt(1,10000);
            var initiator_socketID = server.battleInfo.initiator.socketIO.id;
            socket.to(server.battleInfo.initiator.socketIO.id).emit('battle-accepted', battleInfo)
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


        socket.on('disconnect', function(){
            console.log('user',socket.player.id,'disconnected')
            // var socketID = socket.player.socketIO.id;
            // console.log(socketID)
            // io.sockets.connected
            if(Object.keys(socket.player).length !== 0){
                io.emit('remove',{state: socket.player.world.state, id: socket.player.id})
            }
        })
    });

    function getAllPlayers(){
        var players = [];
        // io.sockets.connect is an internal array of the sockets currently connected to the server
        Object.keys(io.sockets.connected).forEach(function(socketID){
            var player = io.sockets.connected[socketID].player;
            if(!player.id){
                delete io.sockets.connected[socketID]
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
}

