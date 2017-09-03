var LoM = LoM || {};

LoM.Boot = function(){};

// setting game config and loading assets for loading screen
LoM.Boot.prototype = {
    preload: function(){
        // assets for loading screen
        this.load.image('logo','/img/preloadBG.jpg')
    },
    create: function(){
        // white background for loading screen
        this.game.stage.backgroundColor = '#fff';
        
        //physics system for movement
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0, 0, 950, 1583)
        this.world.enableBody = true;

        this.state.start('Preload');
    },

    removePlayer: function(id){
        this.groupMap.players[id].kill();
        delete this.groupMap.players[id]
    },

    // retrieve proper sprite movement
    movePlayer: function(dirInfo){
        var player = this.spriteMap.players[dirInfo.player.id];

        player.body.velocity.x = dirInfo.player.velocity.x;
        player.body.velocity.y = dirInfo.player.velocity.y;
        // console.log(dirInfo.player.world.x,dirInfo.player.world.y)

        // play animation
        if(dirInfo.player.velocity.x === 0 && dirInfo.player.velocity.y === 0){
            player.animations.stop()
        }else{
            player.animations.play(dirInfo.dir,10,false)
        }
    },
}