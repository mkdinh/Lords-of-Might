// INITALIZING GAME STATE
// --------------------------------------------------------------------
// setting up game canvas by declaring single game state with div id='game'
var Game = {};
var layer=[];
var layerCollision;
var layerCollision1;
var user_id; 
Game.init = function(){
    game.stage.disableVisibilityChange = true;
};


// load game assets that we need
Game.preload = function() {
    game.load.tilemap('map', 'img/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'img/map/tilesheet.png',32,32);
    game.load.atlas('sprite1', 'img/sprites/1.png', 'img/sprites/1.json');
    game.load.spritesheet('sprite2','img/sprites/2.png',64,64,36); // this will be the sprite of the players
    game.load.spritesheet('sprite3','img/sprites/3.png',63,63.70,36); // this will be the sprite of the players
    game.load.spritesheet('sprite4','img/sprites/4.png',64,64,36); // this will be the sprite of the players
};

// CREATING GAME STATE
// --------------------------------------------------------------------
// create the map
Game.create = function(){
    Game.playerMap = {};
    Client.askNewPlayer();
    
    // physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    Game.world.enableBody = true;

    // notify the server that new player should be created
    
    // populate map with layers
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet','tileset');
    game.world.setBounds(0, 0, 950, 1583);

    
    
    for(var i = 0; i < map.layers.length; i++) {
        if(i !== 7){
            layer[i] = map.createLayer(i);
        }
    };
    
    layerCollision = map.createLayer('Houses')
    layerCollision1 = map.createLayer('river')
    // set map collision
    // map.setCollisionBetween(43,190,layerHouses,true);
    // map.setCollisionBetween(203,389,layerHouses,true);
    // map.setCollisionBetween(1471,1618,true, layerCollision,true);
    map.setCollisionByExclusion([2,3,4],true, "Houses",false)
    map.setCollisionByExclusion([],true, "river",false);
    // allow clicking on map
    layer.inputEnabled = true; 

    

    this.cursor = game.input.keyboard.createCursorKeys();  
}

Game.update = function(){
    
    game.physics.arcade.collide(Game.playerMap[user_id], layerCollision);
    game.physics.arcade.collide(Game.playerMap[user_id], layerCollision1);

    // player movement
    if(this.cursor.up.isDown){
        Client.move('up')
    }else if(this.cursor.down.isDown){
        Client.move('down');
    }else if(this.cursor.left.isDown){
        Client.move('left')
    }else if(this.cursor.right.isDown){
        Client.move('right')
    }else{
        Client.move('stationary')
    }
}


Game.addNewPlayer = function(id,x,y,sprite){
    // generating sprite
    var avatar = 'sprite' + sprite;
    user_id = id;
    Game.playerMap[id] = game.add.sprite(x,y,avatar);
    Game.playerMap[id].body.maxVelocity.x = 100;
    Game.playerMap[id].body.maxVelocity.y = 100;

    var style = { font: "12px Arial", fill: "#000000",align:'center'};  
    var label_score = this.game.add.text(8, -15, "Foo Bar", style);
    Game.playerMap[id].addChild(label_score);
    // Setting player physics
    Game.playerMap[id].body.collideWorldBounds = true;
    game.physics.enable(Game.playerMap[id],Phaser.Physics.ARCADE);
    game.physics.arcade.collide(Game.playerMap[id], layerCollision);
    game.physics.arcade.collide(Game.playerMap[id], layerCollision1);
    // camera locked onto player
    game.camera.follow(Game.playerMap[id], Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    // send movement to server
    if(sprite === 1){
        Game.playerMap[id].animations.add('up', Phaser.Animation.generateFrameNames('sprite', 7, 12), 5, true);
        Game.playerMap[id].animations.add('down', Phaser.Animation.generateFrameNames('sprite', 1, 6), 5, true);
        Game.playerMap[id].animations.add('left', Phaser.Animation.generateFrameNames('sprite', 19, 23), 5, true);
        Game.playerMap[id].animations.add('right', Phaser.Animation.generateFrameNames('sprite', 13, 17), 5, true);
    }else if(sprite === 2 || sprite === 3 || sprite === 4){
        Game.playerMap[id].animations.add('up',[3,4,5,6],true);
        Game.playerMap[id].animations.add('down',[21,22,23,24],true);
        Game.playerMap[id].animations.add('left',[10,11,12,13],true);
        Game.playerMap[id].animations.add('right',[28,29,30,31],true);
    }
};

Game.render = function(){
    game.debug.cameraInfo(game.camera, 32, 32);
}

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id]
};


// retrieve proper sprite movement
Game.movePlayer = function(id,x,y,dir){
    var player = Game.playerMap[id];
    player.body.velocity.x = x;
    player.body.velocity.y = y;
    player.animations.play(dir,10,false)
}



