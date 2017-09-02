// -------------------------------------------------------------------------------------------
// INITALIZING GAME STATE 
// -------------------------------------------------------------------------------------------
// setting up rpg canvas by declaring single rpg state with div id='rpg'

var LoM = LoM || {};

LoM.Game = function(){};

LoM.Game = {
    // -------------------------------------------------------------------------------------------
    // INITALIZING GAME STATE
    // -------------------------------------------------------------------------------------------
    init:function(){
        this.stage.disableVisibilityChange = true;
    },

    // -------------------------------------------------------------------------------------------
    // CREATE GAME STATE
    // -------------------------------------------------------------------------------------------    
    create: function(){

        // GAME VIEWS INITIALIZATION
        // ------------------------------------------------------------
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.enableBody = true;
        // heep track of all players
        this.playerMap = {};
        this.userReady = false;
        this.playerReady = false;
        this.gameReady = false;
        


        // create collision groups
        this.playerGroup = this.add.group();
        this.playerGroup.enableBody = true;
        this.playerGroup.physicsBodyType = Phaser.Physics.ARCADE;

        this.layerGroup = this.add.group();
        this.layerGroup.enableBody = true;
        this.layerGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        // random sprites
        var sprite1 = this.add.sprite(300,250,'sprite2');
        var sprite2 = this.add.sprite(250,300,'sprite3')
        
        this.layerGroup.add(sprite1);
        this.layerGroup.add(sprite2);

        // populate map with layers 
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tilesheet','tileset');
        
        // set boundary of game state
        this.world.setBounds(0, 0, 950, 1583);
        
        this.layerCollisions = [];

        // for(var i = 0; i < this.map.layers.length; i++) {
        //     if(i !== 7){
        //         this.layer = this.map.createLayer(i);
        //     }
        // };

        // SET LAYERS COLLISION WITH SRPITES
        // -------------------------------------------------------------
        // set map collision
        this.layerCollisions.push(this.addLayerCollisions('Houses',[2,3,4]));
        this.layerCollisions.push(this.addLayerCollisions('Trees2',[212,213,214,215]));
        console.log(this.layerCollisions)
        // allow clicking on map
        // this.layer.inputEnabled = true; 
    
        // debugging collisions
        this.layerCollisions.forEach(function(layer){
            layer.debug = true;
        })

        // add user sprite to game state
        this.newSprite(this.userInfo)


        // ENABLE KEYBOARD INPUT
        // --------------------------------------------------------------
        this.cursor = this.input.keyboard.createCursorKeys();  
    },

    // -------------------------------------------------------------------------------------------
    // UPDATING GAME STATE
    // -------------------------------------------------------------------------------------------    
    update: function(){
        if(this.gameReady){
            this.physics.arcade.collide(this.playerGroup);
            this.physics.arcade.collide(this.playerGroup,this.layerCollisions[0],this.collisionHandler,null,this)
            // player movement
            if(this.cursor.up.isDown){
                Client.move({dir:'up', id: this.userInfo.id})
            }else if(this.cursor.down.isDown){
                Client.move({dir: 'down', id: this.userInfo.id});
            }else if(this.cursor.left.isDown){
                Client.move({dir:'left', id: this.userInfo.id})
            }else if(this.cursor.right.isDown){
                Client.move({dir:'right', id: this.userInfo.id})
            }else{
                Client.move({dir:'stationary', id:this.userInfo.id})
            }
        }
    },

    newSprite : function(dbInfo){
        // generating sprite
        var userSprite;
        var sprite = 6;
        var avatar = 'sprite' + sprite;
        userSprite =  this.add.sprite(dbInfo.x, dbInfo.y, avatar);
        console.log(userSprite)

        userSprite.body.maxVelocity.x = 100;
        userSprite.body.maxVelocity.y = 100;

        // Setting player physics
        userSprite.body.collideWorldBounds = true;
        this.physics.enable(userSprite,Phaser.Physics.ARCADE);
        // camera locked onto player
        this.camera.follow(userSprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        var style = { font: "12px Arial", fill: "#000000",align:'center'};  
        var label_score = this.add.text(8, -15,dbInfo.id, style);
        userSprite.addChild(label_score);

        this.playerGroup.add(userSprite)
        this.world.bringToTop(this.playerGroup);
        this.gameReady = true;
        
        // send movement to server
        if(sprite === 1){
            userSprite.animations.add('up', Phaser.Animation.generateFrameNames('sprite', 7, 12), 5, true);
            userSprite.animations.add('down', Phaser.Animation.generateFrameNames('sprite', 1, 6), 5, true);
            userSprite.animations.add('left', Phaser.Animation.generateFrameNames('sprite', 19, 23), 5, true);
            userSprite.animations.add('right', Phaser.Animation.generateFrameNames('sprite', 13, 17), 5, true);
        }else if(sprite === 2 || sprite === 3 || sprite === 4){
            userSprite.animations.add('up',[3,4,5,6],true);
            userSprite.animations.add('down',[21,22,23,24],true);
            userSprite.animations.add('left',[10,11,12,13],true);
            userSprite.animations.add('right',[28,29,30,31],true);
        }else if(sprite === 5 || sprite === 6){
            userSprite.animations.add('up',[105,106,107,108,109,110,111,112],true);
            userSprite.animations.add('down',[131,132,133,134,135],true);
            userSprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            userSprite.animations.add('right',[144,145,146,147,148],true);
        }
        
        // Keep track of total players
        // console.log(userSprite)
        this.playerMap[dbInfo.id] = userSprite
        
        console.log(this.playerMap)
    },

    renderUser: function(userInfo){
        console.log(this)
        this.newSprite(userInfo)
    },

    renderOthers: function(userArray){
        for(i = 0; i < userArray.length; i++){
            console.log(userArray[i])
            this.newSprite(userArray[i])
        }
        this.gameReady = true
    },

    render: function(){
        // this.debug.spriteInfo(this.playerMap[userInfo.id], 32, 32);
    },

    // retrieve proper sprite movement
    movePlayer: function(dirInfo){
        var player = this.playerMap[dirInfo.dir.id];
        // console.log(dirInfo)
        player.body.velocity.x = dirInfo.player.x;
        player.body.velocity.y = dirInfo.player.y;
        if(dirInfo.player.x === 0 && dirInfo.player.y === 0){
            player.animations.stop()  

        }else{
            player.animations.play(dirInfo.dir.dir,10,false)
        }
    },

    removePlayer: function(id){
        this.playerMap[id].destroy();
        delete this.playerMap[id]
    },

    addLayerCollisions: function(name,exArray){
        var layer = this.map.createLayer(name);
        this.map.setCollisionByExclusion(exArray,true, "Houses",false)
        return layer;
    },

    collisionHandler: function(){
        Client.move('stationary')
    }
}

// var Game = {};
// var layer=[];
// var layerCollision;
// var layerCollision1;
// var user_id; 



// // load rpg assets that we need
// Game.preload = function() {
//     rpg.load.tilemap('map', 'img/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
//     rpg.load.spritesheet('tileset', 'img/map/tilesheet.png',32,32);
//     rpg.load.atlas('sprite1', 'img/sprites/1.png', 'img/sprites/1.json');
//     rpg.load.spritesheet('sprite2','img/sprites/2.png',64,64,36); // this will be the sprite of the players
//     rpg.load.spritesheet('sprite3','img/sprites/3.png',63,63.70,36); // this will be the sprite of the players
//     rpg.load.spritesheet('sprite4','img/sprites/4.png',64,64,36); // this will be the sprite of the players
//     rpg.load.spritesheet('sprite5','img/sprites/5.png',64,64,273);
//     rpg.load.spritesheet('sprite6','img/sprites/6.png',64,64,273);
// };

// CREATING GAME STATE
// --------------------------------------------------------------------
// create the map
// Game.create = function(){
//     Game.playerMap = {};
//     Client.askNewPlayer();
    
//     // physics engine
//     rpg.physics.startSystem(Phaser.Physics.ARCADE);
//     Game.world.enableBody = true;

//     // notify the server that new player should be created
    
//     // populate map with layers
//     var map = rpg.add.tilemap('map');
//     map.addTilesetImage('tilesheet','tileset');
//     rpg.world.setBounds(0, 0, 950, 1583);

    
    
//     for(var i = 0; i < map.layers.length; i++) {
//         if(i !== 7){
//             layer[i] = map.createLayer(i);
//         }
//     };
    
//     layerCollision = map.createLayer('Houses')
//     layerCollision1 = map.createLayer('river')
//     // set map collision
//     // map.setCollisionBetween(43,190,layerHouses,true);
//     // map.setCollisionBetween(203,389,layerHouses,true);
//     // map.setCollisionBetween(1471,1618,true, layerCollision,true);
//     map.setCollisionByExclusion([2,3,4],true, "Houses",false)
//     map.setCollisionByExclusion([],true, "river",false);
//     // allow clicking on map
//     layer.inputEnabled = true; 

    

//     this.cursor = rpg.input.keyboard.createCursorKeys();  
// }

// Game.update = function(){
    
// }











