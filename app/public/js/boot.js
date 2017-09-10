var LoM = LoM || {};

LoM.playerDB = {};
LoM.playerControl = {};
LoM.eventActive = {state: false};
LoM.playerMaster = {};
LoM.spriteMaster = {};
LoM.userInfo = {};

LoM.Boot = function(){};

// setting game config and loading assets for loading screen
LoM.Boot.prototype = {
    preload: function(){
        // assets for loading screen
        this.load.image('logo','/img/preloadBG.jpg')
    
       // load game assets
       $.ajax({
        url: '/game/all',
        method: "GET",
        success: function(playerDB){
    
            // for each player, load the info into a LoM key called LoM.playerDB
            // load the spritesheet with an id key into the game
            for(let i = 0; i < playerDB.length; i++){
                let playerID = playerDB[i].id;
                LoM.playerDB[playerID] = playerDB[i]
            } 
            
            LoM.game.state.start('Preload');
        }
    });

    },
    create: function(){
        // white background for loading screen
            this.game.stage.backgroundColor = '#fff';
            //physics system for movement
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.world.setBounds(0, 0, 950, 1583)
            this.world.enableBody = true;
            console.log('booting stuff')
    }
}