
module.exports = function(io){

    var online = [];
    var server = {};

    io.on('connection', function(socket) {
        // console.log('connected ..')  
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
            // console.log('listen to battle action')
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
            // console.log('action completed, start next user turn')
            var room = battleInfo.room;
            // console.log(data)
            socket.to(room).emit('your-turn',{});
        })  
    })    

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
