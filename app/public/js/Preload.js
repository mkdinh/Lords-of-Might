var LoM = LoM || {};

// loading game assets
LoM.Preload = function(){};

LoM.Preload.prototype = {
    preload: function(){
        // show logo in loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo') 
        this.splash.anchor.setTo(0.5);
    
    // load game assets
    this.load.tilemap('map', 'img/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('tileset', 'img/map/tilesheet.png',32,32);
    this.load.atlas('sprite1', 'img/sprites/1.png', 'img/sprites/1.json');
    this.load.spritesheet('sprite2','img/sprites/2.png',64,64,36); // this will be the sprite of the players
    this.load.spritesheet('sprite3','img/sprites/3.png',63,63.70,36); // this will be the sprite of the players
    this.load.spritesheet('sprite4','img/sprites/4.png',64,64,36); // this will be the sprite of the players
    this.load.spritesheet('sprite5','img/sprites/5.png',64,64,273);
    this.load.spritesheet('sprite6','img/sprites/6.png',64,64,273);
    },
    create: function(){
        
        Client.userInfoDB();
        // this.state.start("Game")
    }
}