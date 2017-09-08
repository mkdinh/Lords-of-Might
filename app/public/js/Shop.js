var LoM = LoM || {};

// loading game assets
LoM.Shop = function(){};

LoM.Shop = {
    preload: function(){
        // show logo in loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo') 
        this.splash.anchor.setTo(0.5);
        this.eventActive = {}
        this.eventActive.state = false;
        // load game assets

        this.load.tilemap('shop-interior', 'img/map/shop.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('shop-tileset', 'img/map/interior.png',32,32);
        this.load.spritesheet('sprite2','img/sprites/2.png',64,64,36);
    },
    create: function(){
        this.userInfo = LoM.Game.userInfo;
        this.groupMap = {};
        this.spriteMap ={};

        this.genDataMap(['tileMap','layers','collisions','players','npcs','objects']);

        this.layerMap = {};
  
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#000000';
        this.world.setBounds(80, 175, 1500, 1500);
        this.map = this.add.tilemap('shop-interior');
        this.map.addTilesetImage('interior', 'shop-tileset');

        this.layerMap.floor = this.map.createLayer('floor');
        this.layerMap.wall = this.map.createLayer('wall');
        this.layerMap.floorItemFront = this.map.createLayer('floorItemFront');
        this.layerMap.floorItemBack = this.map.createLayer('floorItemBack');
        // this.layerMap.wall.debug = true;

        // create a exit door tile map

        this.door = this.add.tilemap('shop-interior');
        this.door.addTilesetImage('interior', 'shop-tileset');
        this.layerMap.door = this.door.createLayer('door');
        this.door.setCollisionByExclusion([],true,'door',true);
        this.layerMap.door.debug = true;
        // this.door.onCollide.add(function(){console.log('hey')})
        this.door.setTileIndexCallback(19, function(){console.log('hey')}, this, 'door')
        var owner = {
            id: '2',
            sprite: 2,
            role: 'npc',
            name: 'Shop Owner',
            velocity: {x: 0, y: 0},
            world: {x: 470,y:320}
        }

        this.addPlayer(owner,"Shop")

        
        // this.layerMap.door = this.map.createLayer('door');
        this.layerMap.counter = this.map.createLayer('counter');
        this.layerMap.counterTop = this.map.createLayer('counterTop');
        // this.layerMap.counter.debug = true;
        this.layerMap.wallItem = this.map.createLayer('wallItem');
        // this.map.setCollisionByExclusion([],true,'wall',true);

        // this.map.setTileIndexCallback(19,function(){console.log('hey')}, this);

      

        for(i = 0; i < LoM.playerArray.length;i++){
            this.addPlayer(LoM.playerArray[i], "Shop")
        }


    },

    update: function(){
        this.physics.arcade.collide(this.groupMap.players, this.groupMap.npcs, this.npcInteractions, null, this);
        this.physics.arcade.collide(this.spriteMap.npcs.owner, this.layerMap.wall);
        this.physics.arcade.collide(this.groupMap.players, this.layerMap.wall);
        // this.physics.arcade.collide(this.spriteMap.players, this.layerMap.door,function(){console.log('hey')});

        this.physics.arcade.collide(this.groupMap.players, this.layerMap.door,function(){
            LoM.game.state.start('Game')
        },null, this);
        

        // update world position 
        var worldX = this.spriteMap.players[this.userInfo.id].x;
        var worldY = this.spriteMap.players[this.userInfo.id].y;

        // check for event active and cancel it if character moves
        if(this.eventActive.state){
            if(!this.lastLocationSaved){
                this.spriteMap.players[this.userInfo.id].lastLocation = {
                    x: this.spriteMap.players[this.userInfo.id].x,
                    y: this.spriteMap.players[this.userInfo.id].y      
                } 
                this.lastLocationSaved = true
            }else{
                var lastLocation = this.spriteMap.players[this.userInfo.id].lastLocation
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
            Client.move({dir:'up', id: this.userInfo.id,  worldX: worldX, worldY: worldY, state: 'Shop' });
        }else if(this.input.keyboard.isDown(Phaser.Keyboard.S)){;
            Client.move({dir: 'down', id: this.userInfo.id, worldX: worldX, worldY: worldY , state: 'Shop'  });
        }else if(this.input.keyboard.isDown(Phaser.Keyboard.A)){
            Client.move({dir:'left', id: this.userInfo.id,  worldX: worldX, worldY: worldY ,state: 'Shop' })
        }else if(this.input.keyboard.isDown(Phaser.Keyboard.D)){
            Client.move({dir:'right', id: this.userInfo.id,  worldX: worldX, worldY: worldY , state: 'Shop'  })
        }else if(this.input.keyboard.upDuration(65,75)|| this.input.keyboard.upDuration(87,75) || this.input.keyboard.upDuration(83,75) || this.input.keyboard.upDuration(68,75)){
            Client.move({dir:'stationary', id:this.userInfo.id, worldX: worldX, worldY: worldY, state: 'Shop'})
        }
    },
    render: function(){
        LoM.game.debug.bodyInfo(this.spriteMap.npcs[2], 32, 500);
    }
}