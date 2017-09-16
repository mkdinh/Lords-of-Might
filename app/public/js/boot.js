var LoM = LoM || {};
var game;
var userInfo = {};
LoM.playerDB = {};
LoM.playerControl = {};
LoM.eventActive = {state: false};
LoM.playerMaster = {};
LoM.spriteMaster = {};
LoM.userInfo = {};
LoM.battleInfo = {};

LoM.Boot = function(){};

// setting game config and loading assets for loading screen
LoM.Boot.prototype = {
    preload: function(){
        // assets for loading screen
        this.load.image('boot-bg','img/backgrounds/bg-5.jpg')
        loadingGIF()
        // load game assets
        $.ajax({
            url: '/game/all',
            method: "GET",
            success: function(playerDB){
            LoM.game.stage.disableVisibilityChange = true;
            // console.log(playerDB)
            // for each player, load the info into a LoM key called LoM.playerDB
            // load the spritesheet with an id key into the game
            for(let i = 0; i < playerDB.length; i++){
                let playerID = playerDB[i].id;
                LoM.playerDB[playerID] = playerDB[i]    
            } 
            console.log('starting preload')
            LoM.game.state.start('Preload');
        }
    });

    },
    create: function(){
    }
}