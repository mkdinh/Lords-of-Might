var LoM = LoM || {};

LoM.Boot = function(){};

// setting game config and loading assets for loading screen
LoM.Boot.prototype = {
    preload: function(){
        // assets for loading screen
        this.load.image('logo','/img/preloadBG.jpg')
    
        // LoM.game.world.scale.x = 1.2;
        // console.log(LoM.game.world)
    },
    create: function(){
        // white background for loading screen
        this.game.stage.backgroundColor = '#fff';
        
        //physics system for movement
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0, 0, 950, 1583)
        this.world.enableBody = true;
        console.log('booting stuff')
        this.state.start('Preload');
    }
}