
module.exports = function(io){

    var online = [];
    var server = {};

    io.on('connection', function(socket) {

        // HANDLIGN BATTLE ACTIONS

        socket.on('battleAction', function(state){
            console.log('action on server',state.action)
            switch(state.action){
                case 'attack':
                    attackCallback(state)
                    return
                case 'spell':
                    spellCallback(state)
                    return
                case 'potion':
                    potionCallback(state)
                    return
            }
        })

        socket.on('actionCompleted', function(state){
            // console.log(state)
            // console.log('action completed, start next user turn')
            // console.log(battleInfo)
            var room = state.room;
            // console.log(data)
            socket.to(room).emit('your-turn',{});
        })  
    })    

    function randomInt (low,high){
        return Math.floor(Math.random() * (high - low) + low);
    }

    function attackCallback(state){
        var attackerID = state.roleID.attacker;
        var defenderID = state.roleID.defender;
        var attacker = state.player[attackerID];
        var defender = state.player[defenderID];
        var room = state.room;

        // attack logic here with data
        
        var attackPoints = randomInt(attacker.weapon.damage[0],attacker.weapon.damage[1]);
        defender.hp -= attackPoints;

        // emit signal to battling player
        io.in(room).emit('battleReaction',state)

    }

    function spellCallback(state){
        // attack logic here with data
        var attackerID = state.roleID.attacker;
        var defenderID = state.roleID.defender;
        var attacker = state.player[attackerID];
        var defender = state.player[defenderID];
        var room = state.room;

        // attack logic here with data
        
        var spellPoints = randomInt(attacker.spell.damage[0],attacker.spell.damage[1]);
        defender.hp -= spellPoints;
        // emit signal to battling player
        var room = state.room;
        io.in(room).emit('battleReaction',state)
    }

    function potionCallback(state){
        // attack logic here with data
        // console.log('response to an potion request')
        // emit signal to battling player
        var room = state.room;
        io.in(room).emit('battleReaction',state)
    }
}
