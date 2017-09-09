var LoM = LoM || {};
var initialized = false;

// loading game assets
LoM.Shop = function(){};

LoM.Shop = {
    // allow game to run offscreen
    init:function(){
        this.stage.disableVisibilityChange = true;
    },

    preload: function(){
        
        // set event handling boolean to prevent multiple collisions
        this.eventActive = {}
        this.eventActive.state = false;
        
        // load game assets
        this.load.tilemap('shop-interior', 'img/map/shop.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('shop-tileset', 'img/map/interior.png',32,32);
        this.load.spritesheet('sprite2','img/sprites/2.png',64,64,36);
    },
    create: function(){
        //initialize world boundary and background 
        this.stage.backgroundColor = '#000000';
        this.world.setBounds(-30, -200, 1500, 1500);

        // set update userInfo with the latest update from sprite master
        var id = LoM.userInfo.id 
        LoM.userInfo = LoM.playerMaster[id]
        console.log(LoM.userInfo)
        
        // generate object map to keep track of data
        this.groupMap = {};
        this.spriteMap ={};

        this.genDataMap(['tileMap','layers','collisions','players','npcs','objects']);
        this.layerMap = {};

        // generate base layers with wall collisions and sandwhiching npc srpite in between
        // for a "behind the counter" effects
        this.map = this.add.tilemap('shop-interior');
        this.map.addTilesetImage('interior', 'shop-tileset');

        this.layerMap.floor = this.map.createLayer('floor');
        this.layerMap.wall = this.map.createLayer('wall');
        this.layerMap.floorItemFront = this.map.createLayer('floorItemFront');
        this.layerMap.floorItemBack = this.map.createLayer('floorItemBack');
        // this.layerMap.wall.debug = true;

        // generating npc sprite
        var owner = {
            id: 'Shop Owner',
            sprite: "sprite"+2,
            role: 'npc',
            name: 'Shop Owner',
            velocity: {x: 0, y: -100},
            world: {x: 470,y:320,state: 'Shop'}
        }

        // add owner npc *******HOPEFULLY FROM DB**************
        this.addPlayer(owner,"Shop");     
        this.spriteMap.npcs['Shop Owner'].body.immovable = true;
     
        // generating the rest of the layers othert the owner sprite
        this.layerMap.counter = this.map.createLayer('counter');
        this.layerMap.counterTop = this.map.createLayer('counterTop');
        // this.layerMap.counter.debug = true;
        this.map.setCollisionByExclusion([],true,'wall',true);
        this.layerMap.wallItem = this.map.createLayer('wallItem');
        
        // generate another tilemap for exit door collisions
        this.door = this.add.tilemap('shop-interior');
        this.door.addTilesetImage('interior', 'shop-tileset');
        this.layerMap.door = this.door.createLayer('door');
        this.door.setCollisionByExclusion([],true,'door',true);
        // this.layerMap.door.debug = true;


        // for each user profile in playerMast, if the loctionvis equal to Shop, then 
        // create a sprite for that user, preventing player that are not currently viewing
        // shop from appearing
        for(player in LoM.playerMaster){
            // console.log(player)
            if(LoM.playerMaster[player].world.state === 'Shop'){
                this.addPlayer(LoM.playerMaster[player])
            }
        };  

        // start game update
        initialized = true;
    },

    update: function(){
        if(initialized){
            // listen for collisions between groups of sprites and tileMap
            // use this to active events
            this.physics.arcade.collide(this.groupMap.players, this.groupMap.npcs, this.npcInteractions, null, this);
            this.physics.arcade.collide(this.spriteMap.npcs.owner, this.layerMap.wall);
            this.physics.arcade.collide(LoM.spriteMaster[LoM.userInfo.id], this.layerMap.wall);
            this.physics.arcade.collide(this.spriteMap.players, this.layerMap.door,function(){console.log('hey')});
            // change state from Shop to Town
            this.physics.arcade.collide(LoM.spriteMaster[LoM.userInfo.id], this.layerMap.door,function(player,building){
                // console.log(player,building)
                LoM.playerMaster[LoM.userInfo.id].world.state = "Town"
                var user = LoM.playerMaster[LoM.userInfo.id]
                console.log('exiting Shop')
                Client.changeState(user);
            },null, this);
            

            // update world position 
            var worldX = LoM.spriteMaster[LoM.userInfo.id].x;
            var worldY = LoM.spriteMaster[LoM.userInfo.id].y;

            // check for event active and cancel it if character moves
            if(this.eventActive.state){
                if(!this.lastLocationSaved){
                    LoM.spriteMaster[LoM.userInfo.id].lastLocation = {
                        x: LoM.spriteMaster[LoM.userInfo.id].x,
                        y: LoM.spriteMaster[LoM.userInfo.id].y      
                    } 
                    this.lastLocationSaved = true
                }else{
                    var lastLocation = LoM.spriteMaster[LoM.userInfo.id].lastLocation
                    var dX = worldX - lastLocation.x;
                    var dY = worldY - lastLocation.y;
                    var distance = Math.sqrt( Math.pow(dX, 2) + Math.pow(dY, 2));
                    if(distance > 20){
                        this.eventActive.state = false;
                        this.eventActive.player = {};
                        this.eventActive.target = {};
                        this.lastLocationSaved = false;
                        console.log('reset event')
                        removeInteractionDisplay()
                    }
                }
            }
        
        
            // listen for key press for character movement and pass that information to socket.io
            // if the last key pressed was 100ms ago, then listen stop updating to server 
            if(this.input.keyboard.isDown(Phaser.Keyboard.W)){  
                Client.move({dir:'up', id: LoM.userInfo.id,  worldX: worldX, worldY: worldY, state: 'Shop' });
            }else if(this.input.keyboard.isDown(Phaser.Keyboard.S)){;
                Client.move({dir: 'down', id: LoM.userInfo.id, worldX: worldX, worldY: worldY , state: 'Shop'  });
            }else if(this.input.keyboard.isDown(Phaser.Keyboard.A)){
                Client.move({dir:'left', id: LoM.userInfo.id,  worldX: worldX, worldY: worldY ,state: 'Shop' })
            }else if(this.input.keyboard.isDown(Phaser.Keyboard.D)){
                Client.move({dir:'right', id: LoM.userInfo.id,  worldX: worldX, worldY: worldY , state: 'Shop'  })
            }else if(this.input.keyboard.upDuration(65,75)|| this.input.keyboard.upDuration(87,75) || this.input.keyboard.upDuration(83,75) || this.input.keyboard.upDuration(68,75)){
                Client.move({dir:'stationary', id:LoM.userInfo.id, worldX: worldX, worldY: worldY, state: 'Shop'})
            }
        }
    },
    render: function(){
        // LoM.game.debug.bodyInfo(this.spriteMap.npcs[2], 32, 500);
    }
}