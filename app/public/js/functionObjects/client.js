var Client = {};

Client.socket = io.connect();

// HANDLING CHAT
// ------------------------------------------------------------------

Client.sendGlobalMessage = function(message){
    Client.socket.emit('global-message',message)
}

Client.socket.on('global-message', function(message){
    var globalMessages = $('#global-messages')
    var user = message.user;
    var body = message.body;

    var message = '<p class="message-text">'+ user + ': ' + body + '</p>'

    globalMessages.append(message)

    $('#global-messages')[0].scrollTop = $('#global-messages')[0].scrollHeight;
    
})


// HANDLING GAME CONNECTION
// ------------------------------------------------------------------

Client.userInfoDB = function(){
    this.socket.emit('user')
};


Client.socket.on('render-user', function(data){
    LoM.Game.addPlayer(data.new)
})

Client.move = function(movement){
    this.socket.emit('key-pressed',movement)
}

Client.socket.on('start', function(data){
    LoM.Game.userInfo = data.user;
    LoM.playerArray = data.others
    
    
    LoM.game.state.start('Game')
})


// HANDLING CHAR MANAGEMENT
// ------------------------------------------------------------------

Client.socket.on('move', function(data){
    // console.log(data)
    LoM[data.state].movePlayer(data)
})

Client.socket.on('remove',function(data){
    console.log('removed',data.id)
    LoM.Game.removePlayer(data.id)

})

Client.changeState = function(user){
    this.socket.emit('change-state',user)
    console.log('emit',user)
}

Client.socket.on('change-state',function(user){
    // for(key in LoM.playerMaster){
    //     console.log(key,LoM.playerMaster[key].world.location)
    // }
    var userID = user.id;
    console.log(user)
    var userLocation = user.world.location;
    LoM.playerMaster[userID] = user;

    setTimeout(function(){LoM.game.state.start(userLocation)},500);
    // for(key in LoM.playerMaster){
    //     console.log(key,LoM.playerMaster[key].world.location)
    // }
})

Client.socket.on('player-changed-state',function(player){
    // for(key in LoM.playerMaster){
    //     console.log(key,LoM.playerMaster[key].world.location)
    // }
    
    var user = LoM.playerMaster[LoM.userInfo.id];
    console.log(user.world.location)
    LoM.playerMaster[player.id] = player;
    // if user state is not equal to play state, remove player sprite
    if(user.world.location !== 'Battle'){
        // if incoming player location is not Battle
        if(user.world.location !== player.world.location){
            LoM[user.world.location].spriteMap.players[player.id].kill()
            console.log('kill sprite')
            // update player changes on playerMaster
            console.log(LoM.playerMaster[player.id])
        }else if(user.world.location === player.world.location){
        //else if user location is equal to player location, add player sprite
            LoM[user.world.location].addPlayer(player)
            console.log('player added')
        }
    }
    
})


// HANDLING BATTLE REQUEST
// ------------------------------------------------------------------

// initiator sent battle request to server with battle infomation
Client.battleRequest = function(){
    $('#battle-request').fadeOut(function(){})

    console.log('battle request sent')
    this.socket.emit('battle-request', game.battleInfo)
}

Client.socket.on('battle-requested',function(battleInfo){
    game.battleInfo = battleInfo;
    genBattleInteraction()
    console.log('battle request received')
    $('#battle-request').remove();
    $('#battle-accept').fadeIn();
    $('#battle-decline').fadeIn();
    var body = game.battleInfo.initiator.id + ' requested a battle'
    announcement(body)
})

Client.battleAccept = function(battleInfo){
    // send accept information to server
    this.socket.emit('battle-accept',battleInfo)
    removeInteractionDisplay()
}

Client.socket.on('battle-accepted',function(battleInfo){
    var body = game.battleInfo.receiver.id + ' has accept your invitation! Good luck on the battlefield!'
    announcement(body)
    // battleInfo.receiver.id)
    // go to phraser and go to battle phrase with challenger
    // $('#battle')
})

Client.battleDecline = function(){
    this.socket.emit('battle-decline',{})
    removeInteractionDisplay()
}

Client.socket.on('battle-declined',function(data){
    // var body = game.battleInfo.receiver.id + ' has declined your invitation'
    // announcement(body)
    // $('#battle')
})

Client.socket.on('battle-room',function(instance){
    game.battleInfo.room = instance.room;
    var body = 'Joining room: ' + instance.room
    announcement(body)
    setTimeout(function(){
        removeInteractionDisplay()
        // LoM.game.state.start('Battle')
        LoM.playerMaster[LoM.userInfo.id].world.location = "Battle"
        var user = LoM.playerMaster[LoM.userInfo.id]
        console.log('exiting Shop')
        Client.changeState(user);
    },5000)
    // $('#battle')
})


// HANDLING BATTLE MECHANICS
// ------------------------------------------------------------------

Client.battleAction = function(state){
    console.log('action to client')
    this.socket.emit('battleAction',state)
}

Client.socket.on('battleReaction',function(state){
    // update current battle state
    LoM.Battle.state.player = state.player;
    switch(state.action){
        case 'attack':
            LoM.Battle.attack(state)
            return
        case 'spell':
            LoM.Battle.spell(state)
            return
        case 'potion':
            LoM.Battle.potion(state)
            return
    }
})

Client.actionCompleted = function(state){
    if(user.id === state.roleID.attacker){
        console.log('action completed')
        this.socket.emit('actionCompleted', state)
    }
}

Client.socket.on('your-turn',function(state){
    console.log(user.id,'your turn')
    LoM.Battle.state.turn = user.id;
})


