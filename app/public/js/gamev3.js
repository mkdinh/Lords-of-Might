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
        // -----------------------------------------------------------
        this.gameReady = false;
         
        // setting world 
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tilesheet','tileset');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0, 0, 950, 1583)
        this.world.enableBody = true;

        // generate data map
        this.groupMap = {}
        this.spriteMap = {}

        
        this.genGroupMap()
        this.genSpriteMap()
;
        // generate layerx and layer collisions
        this.genLayers();
        this.genLayerCollisions('Houses','shop',this.buildingInteractions);

        // add user sprite to game state
        // console.log(this.playerArray)
        for(i = 0; i < this.playerArray.length;i++){
            this.newSprite(this.playerArray[i])
        }

        var sprite2Info = {
            id: 'npc',
            sprite: 2,
            name: 'sample',
            velocity: {x: -10, y: 0},
            world: {x: 400,y:400}
        }
        
        this.newSprite(sprite2Info);
        this.sprite2 = this.groupMap.npcs['sample'];

        this.gameReady = true;

        // ENABLE KEYBOARD INPUT
        // --------------------------------------------------------------
        this.cursor = this.input.keyboard.createCursorKeys();  
    },

    // -------------------------------------------------------------------------------------------
    // UPDATING GAME STATE
    // -------------------------------------------------------------------------------------------    
    update: function(){
        if(this.gameReady){
            
            this.physics.arcade.collide(this.groupMap.players, this.groupMap.players, this.playerInteractions, null, this);
            this.physics.arcade.collide(this.groupMap.players, this.groupMap.npcs, this.npcInteractions, null, this);
            this.physics.arcade.collide(this.groupMap.players, this.spriteMap.collisions['shop'],this.spriteMap.collisions['shop'].data['onCollide'], null, this);
                
            var worldX = this.spriteMap.players[this.userInfo.id].worldPosition.x;
            var worldY = this.spriteMap.players[this.userInfo.id].worldPosition.y

            if(!this.eventOccur){
                if(this.cursor.up.isDown){
                    Client.move({dir:'up', id: this.userInfo.id,  worldX: worldX, worldY: worldY });
                }else if(this.cursor.down.isDown){;
                    Client.move({dir: 'down', id: this.userInfo.id, worldX: worldX, worldY: worldY });
                }else if(this.cursor.left.isDown){
                    Client.move({dir:'left', id: this.userInfo.id,  worldX: worldX, worldY: worldY })
                }else if(this.cursor.right.isDown){
                    Client.move({dir:'right', id: this.userInfo.id,  worldX: worldX, worldY: worldY })
                }else if(this.input.keyboard.upDuration(37,100)|| this.input.keyboard.upDuration(38,100) || this.input.keyboard.upDuration(39,100) || this.input.keyboard.upDuration(40,100)){
                    Client.move({dir:'stationary', id:this.userInfo.id,   worldX: worldX, worldY: worldY})
                }
            }
        }
    },

    newSprite : function(dbInfo){
        // console.log(dbInfo)
        // generating sprite
        var sprite;
        dbInfo.sprite = 4
        var spriteNum = dbInfo.sprite; 
        var avatar = 'sprite' + spriteNum;
        sprite =  this.add.sprite(dbInfo.world.x, dbInfo.world.y, avatar);
        sprite.data = dbInfo;
        // console.log(sprite)
        console.log('id=',dbInfo.id,'x=',dbInfo.world.x,'y=',dbInfo.world.y)
        sprite.body.maxVelocity.x = 100;
        sprite.body.maxVelocity.y = 100;
        sprite.body.bounce.x = 1;
        sprite.body.bounce.y = 1;

        // Setting player physics
        sprite.body.collideWorldBounds = true;
        this.physics.enable(sprite,Phaser.Physics.ARCADE);

        // Add events on collide
        // sprite.body.onCollide = new Phaser.Signal();
        // sprite.body.onCollide.add(this.collisionHandler,this)
    
        
        var style = { font: "12px Arial", fill: "#000000",align:'center'};  
        var label_score = this.add.text(8, -15,dbInfo.id, style);
        sprite.addChild(label_score);

        if(dbInfo.id === 'npc'){
            this.groupMap.npcs.add(sprite)
            this.world.bringToTop(this.groupMap.npcs);
        }else{
            this.groupMap.players.add(sprite)
            this.world.bringToTop(this.groupMap.players);
            console.log('players')
        }

        if(dbInfo.id === this.userInfo.id){
            this.camera.follow(sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }

        this.genAnimations(sprite)

        // Keep track of total players
        // console.log(sprite)
        if(dbInfo.id === 'npc'){
            this.spriteMap.npcs[dbInfo.name] = sprite
        }else{
            this.spriteMap.players[dbInfo.id] = sprite
        }
    },

    render: function(){
        // this.debug.spriteInfo(this.playerMap[userInfo.id], 32, 32);
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

    // addLayerCollisions: function(name,exArray){
    //     var layer = this.map.createLayer(name);
    //     return layer;
    // },

    randomInt: function (low,high){
        return Math.floor(Math.random() * (high - low) + low);
    },

    buildingInteractions: function(obj1,obj2){
        console.log('hey')
        var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 400, align: "center", backgroundColor: "#ffff00" };
        var t = this.add.text(this.camera.x + (this.width/2), this.camera.y + (this.height/2), "New building, open soon!", style);
        t.fixedToCamera = true;
        t.cameraOffset.setTo(200, 500);
    },

    npcInteractions: function(npc){
        // console.log('interacts with npc')
    },

    playerInteractions: function(obj1,obj2){
        obj1.body.velocity.x = -obj1.body.speed;
        obj1.body.velocity.y = -obj1.body.speed;
        console.log('collide',obj1);
        // console.log('player collided',obj1.body.isMoving,obj2.body.isMoving)
        obj2.body.velocity.x = 0;
        obj2.body.velocity.y = 0;
        // this.eventOccur = true
        // console.log(this.eventOccur)
        // setTimeout(function(){this.eventOccur = false; console.log(this.eventOccur)},4000)
    },

    genGroupMap: function(){
        // layers
        this.groupMap.layers = this.add.group();
        this.groupMap.layers.enableBody = true;
        this.groupMap.layers.physicsBodyType = Phaser.Physics.ARCADE;

        // layer collisions
        this.groupMap.layerCollisions = this.add.group();
 
        // players
        this.groupMap.players = this.add.group();
        this.groupMap.players.enableBody = true;
        this.groupMap.players.physicsBodyType = Phaser.Physics.ARCADE;
        
        // non playables
        this.groupMap.npcs = this.add.group();
        this.groupMap.npcs.enableBody = true;
        this.groupMap.npcs.physicsBodyType = Phaser.Physics.ARCADE; 

        this.groupMap.enemies = this.add.group();
        this.groupMap.enemies.enableBody = true;
        this.groupMap.enemies.physicsBodyType = Phaser.Physics.ARCADE; 

        // this.groupMap.othersGroup = this.add.group();
        // this.groupMap.othersGroup.enableBody = true;
        // this.groupMap.othersGroup.physicsBodyType = Phaser.Physics.ARCADE; 

    },
    
    genSpriteMap: function(){
                this.spriteMap.players = {};
                this.spriteMap.npcs = {};
                this.spriteMap.enemies = {};
                this.spriteMap.objects = {};
                this.spriteMap.collisions = {}
    },

    genLayers: function(){
        
        // generate layers
        for(var i = 0; i < this.map.layers.length; i++) {
            this.groupMap.layers.add(this.map.createLayer(i));
        };

        // this.groupMap.layers.children.forEach(function(layer){
        //     layer.debug = true;
        // })
    },

    genLayerCollisions: function(layer,name,interaction) {
        // SET LAYERS COLLISION WITH SRPITES
        // -------------------------------------------------------------
        var layerIndex = this.map.getLayer(layer);
        
        var layerData = this.map.layers[layerIndex];
        layerData.debug = true
        // set map collision
        this.map.setCollisionBetween(147,148,true,layer,true);
        this.map.setCollisionBetween(1595,1596,true,layer,true);
        this.map.setCollisionBetween(1662,1662,true,layer,true);
        this.spriteMap.collisions[name] = this.map.createLayer(layer);
        this.spriteMap.collisions[name].data['onCollide'] = interaction 
        console.log(this.spriteMap.collisions[name].data)

        
        
        // allow clicking on map
        // this.layer.inputEnabled = true; 
    },
    
    genAnimations: function(sprite){
        // send movement to server
        spriteNum = sprite.data.sprite
        if(spriteNum === 1){
            sprite.animations.add('up', Phaser.Animation.generateFrameNames('sprite', 7, 12), 5, true);
            sprite.animations.add('down', Phaser.Animation.generateFrameNames('sprite', 1, 6), 5, true);
            sprite.animations.add('left', Phaser.Animation.generateFrameNames('sprite', 19, 23), 5, true);
            sprite.animations.add('right', Phaser.Animation.generateFrameNames('sprite', 13, 17), 5, true);
        }else if(spriteNum === 2 || spriteNum === 3 || spriteNum === 4){
            sprite.animations.add('up',[3,4,5,6],true);
            sprite.animations.add('down',[21,22,23,24],true);
            sprite.animations.add('left',[10,11,12,13],true);
            sprite.animations.add('right',[28,29,30,31],true);
        }else if(spriteNum === 5 || spriteNum === 6){
            sprite.animations.add('up',[105,106,107,108,109,110,111,112],true);
            sprite.animations.add('down',[131,132,133,134,135],true);
            sprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            sprite.animations.add('right',[144,145,146,147,148],true);
        }
    },
    
    checkCollisions: function(){

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











