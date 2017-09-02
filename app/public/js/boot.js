var LoM = LoM || {};

LoM.Boot = function(){};

// setting game config and loading assets for loading screen
LoM.Boot.prototype = {
    preload: function(){
        // assets for loading screen
        this.load.image('logo','/img/loading.jpg')
    },
    create: function(){
        // white background for loading screen
        this.game.stage.backgroundColor = '#fff';
        
        // scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;

        //have the game centered horizontally
	    this.scale.pageAlignHorizontally = true;
    
        //physics system for movement
        

        this.state.start('Preload');
    }
}