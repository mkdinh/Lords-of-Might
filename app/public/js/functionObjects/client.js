var Client = {};

Client.socket = io.connect();

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

Client.socket.on('move', function(data){
    LoM[data.state].movePlayer(data)
})

Client.socket.on('remove',function(data){
    console.log('removed',data.id)
    LoM.Game.removePlayer(data.id)

})

Client.socket.on('npc-interaction', function(sprites){
    // console.log(sprites)
})

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

Client.battleAccept = function(){
    // send accept information to server
    this.socket.emit('battle-accept',{})
    removeInteractionDisplay()
}

Client.socket.on('battle-accepted',function(data){
    var body = game.battleInfo.receiver.id + ' has accept your invitation! Good luck on the battlefield!'
    announcement(body)
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
        LoM.game.state.start('Battle')
    },5000)
    // $('#battle')
})

// HANDLE BATTLE REQUEST

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


