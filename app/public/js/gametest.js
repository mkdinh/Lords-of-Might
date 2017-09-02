// INITALIZING GAME STATE
// --------------------------------------------------------------------
// setting up game canvas by declaring single game state with div id='game'
var Game = {};
var map;
var tileset;
var layer;
var p;
var cursor;
Game.init = function(){
    game.stage.disableVisibilityChange = true;
};


// load game assets that we need
Game.preload = function() {
    game.load.tilemap('map', 'img/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'img/map/tilesheet.png',32,32);
    game.load.image('sprite1', 'img/sprites/sprite.png');
};

// CREATING GAME STATE
// --------------------------------------------------------------------
// // create the map
Game.create = function(){
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet','tileset');
    game.stage.backgroundColor = '#ffffff';
    
    //  This will check Sprite vs. Sprite collision using a custom process callback
    sprite1 = game.add.sprite(0, 200, 'sprite1');
    sprite2 = game.add.sprite(0, 400, 'sprite1');
    game.physics.enable([sprite1,sprite2])
    
    
    layer = map.createLayer('Trees2');
    layer.resizeWorld();
    map.setCollisionBetween(212,294,true, layer,true);
    

    
    cursor = game.input.keyboard.createCursorKeys();  
}


Game.update = function(){
    // game.physics.arcade.overlap(Game.playerMap[user_id], layer);
    game.physics.arcade.collide(sprite1, sprite2);
    game.physics.arcade.collide(sprite1, layer);
    // player movement console.lo
    if(cursor.up.isDown){
        sprite1.body.velocity.y = -50
        // sprite1.body.y -= 5
    }else if(cursor.down.isDown){
        // sprite1.body.y += 5
        sprite1.body.velocity.y = +50
    }else if(cursor.left.isDown){
        sprite1.body.x -= 5
    }else if(cursor.right.isDown){
        sprite1.body.x += 5
    }else{
        sprite1.body.velocity.x = 0
        sprite.body.velocity.y = 0
    }
}

function processCallback (obj1, obj2) {
        console.log(obj1)
        //  This function can perform your own additional checks on the 2 objects that collided.
        //  For example you could test for velocity, health, etc.
        //  This function needs to return either true or false. If it returns true then collision carries on (separating the two objects).
        //  If it returns false the collision is assumed to have failed and aborts, no further checks or separation happen.
    
    }
    
    function collisionCallback (obj1, obj2) {
    
        game.stage.backgroundColor = '#992d2d';
      

    }


// Game.addNewPlayer = function(id,x,y,sprite){
//     var avatar = 'sprite' + sprite;
//     user_id = id;
//     console.log(user_id)
//     Game.playerMap[id] = game.add.sprite(x,y,avatar);
//     console.log(Game.playerMap[id])
//     Game.playerMap[id].body.collideWorldBounds = true;
//     // game.physics.enable(Game.playerMap[id],Phaser.Physics.ARCADE, true);
//     // Game.playerMap[id].physicsBodyType = Phaser.Physics.P2JS;
//     // game.physics.p2.enable(Game.playerMap[id]);

//     Game.playerMap[id].animations.add('right', Phaser.Animation.generateFrameNames('sprite', 13, 17), 5, true);
//     game.camera.follow(Game.playerMap[id], Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    
//     if(sprite === 1){
//     Game.playerMap[id].animations.add('up', Phaser.Animation.generateFrameNames('sprite', 7, 12), 5, true);
//     Game.playerMap[id].animations.add('down', Phaser.Animation.generateFrameNames('sprite', 1, 6), 5, true);
//     Game.playerMap[id].animations.add('left', Phaser.Animation.generateFrameNames('sprite', 19, 23), 5, true);
//     }else if(sprite === 2 || sprite === 3 || sprite === 4){
//         Game.playerMap[id].animations.add('up',[3,4,5,6],true);
//         Game.playerMap[id].animations.add('down',[21,22,23,24],true);
//         Game.playerMap[id].animations.add('left',[10,11,12,13],true);
//         Game.playerMap[id].animations.add('right',[28,29,30,31],true);
//     }
// };

Game.render = function(){
    this.game.debug.body(sprite1, 'rgba(255,0,0,0.5)');
}

// Game.removePlayer = function(id){
//     Game.playerMap[id].destroy();
//     delete Game.playerMap[id]
// };


// // retrieve proper sprite
// Game.movePlayer = function(id,x,y,dir){
//     var player = Game.playerMap[id];

//     var distance = Phaser.Math.distance(player.x,player.y,x,y)
//     var duration = distance;
//     var tween = game.add.tween(player);
//     tween.to({x:x,y:y}, duration);
//     tween.start()
//     player.animations.play(dir,10,false)
// }



