var LoM = LoM || {};

// loading game assets
LoM.Shop = function(){};

LoM.Shop = {
    preload: function(){
        // show logo in loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo') 
        this.splash.anchor.setTo(0.5);
    
        // load game assets

        this.load.tilemap('shop-interior', 'img/map/shop.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('shop-tileset', 'img/map/interior.png',32,32);
        this.load.spritesheet('sprite2','img/sprites/2.png',64,64,36);
    },
    create: function(){
        this.userInfo = LoM.Game.userInfo;
        this.groupMap = {};
        this.spriteMap ={};

        this.genDataMap(['players','npcs']);

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
        this.layerMap.wall.debug = true;
        var owner = this.add.sprite(470,320,'sprite2');
        owner.frame = 19;
        owner.body.collideWorldBounds = true;
        this.physics.enable(owner);
        this.spriteMap.npcs.owner = owner;
        
        this.layerMap.door = this.map.createLayer('door');
        this.layerMap.counter = this.map.createLayer('counter');
        this.layerMap.counterTop = this.map.createLayer('counterTop');
        this.layerMap.counter.debug = true;
        this.layerMap.wallItem = this.map.createLayer('wallItem');
        this.map.setCollisionByExclusion([],true,'wall',true);

        for(i = 0; i < LoM.playerArray.length;i++){
            console
            this.addPlayer(LoM.playerArray[i])
        }

    },

    update: function(){
        this.physics.arcade.collide(this.spriteMap.npcs.owner, this.layerMap.wall);
        this.physics.arcade.collide(this.groupMap.players, this.layerMap.wall);

        // update world position 
        var worldX = this.spriteMap.players[this.userInfo.id].x;
        var worldY = this.spriteMap.players[this.userInfo.id].y;
        
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
        LoM.game.debug.bodyInfo(this.spriteMap.npcs.owner, 32, 500);
    }
}