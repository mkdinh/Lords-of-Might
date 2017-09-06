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
        console.log('booting')
        this.state.start('Preload');
    }
}