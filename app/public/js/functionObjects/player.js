var LoM = LoM || {};

playerControl = {

    addPlayer : function(dbInfo){
        // generating sprite
        var sprite;
        var spriteNum = dbInfo.sprite; 
        var avatar = 'sprite' + spriteNum;
        console.log(dbInfo)
        sprite =  this.add.sprite(dbInfo.world.x, dbInfo.world.y, avatar);
        sprite.data = dbInfo;
        sprite.eventActive = false;
        sprite.body.onCollide = new Phaser.Signal()
        sprite.body.onCollide.add(function(){
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
        });
        
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.playerInteractions, this);
        sprite.events.onInputOver.add(this.pointerOverIndicator, this);
        sprite.events.onInputOut.add(this.pointerOutIndicator, this);
        sprite.input.useHandCursor = true;

        console.log(sprite)

        if(dbInfo.role === 'npc'){
            sprite.body.immovable = true;
        }
        
        sprite.lastLocation = {};
        sprite.body.maxVelocity.x = 100;
        sprite.body.maxVelocity.y = 100;
        sprite.body.bounce.x = 0;
        sprite.body.bounce.y = 0;

        // Setting player physics
        sprite.body.collideWorldBounds = true;
        
        // setting display label
        var style = { font: "12px Arial", fill: "#000000",align:'center',boundsAlignH:'center', backgroundColor:'rgba(255,255,255,.3)'};

        if(dbInfo.role === 'player'){ 
            var label = this.add.text(8, -15,dbInfo.id, style);   
        }else{
            var label= this.add.text(8, -15,dbInfo.name, style);
        }

        sprite.addChild(label);

        if(dbInfo.role === 'npc'){
            this.groupMap.npcs.add(sprite)
            this.world.bringToTop(this.groupMap.npcs);
        }else{
            this.groupMap.players.add(sprite)
            this.world.bringToTop(this.groupMap.players);
        }

        if(dbInfo.id === this.userInfo.id){
            this.camera.follow(sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            console.log(sprite.body)
        }

        this.genAnimations(sprite)
        
        // Keep track of total players
        // console.log(sprite)
        if(dbInfo.role === 'npc'){
            this.spriteMap.npcs[dbInfo.id] = sprite
        }else{
            this.spriteMap.players[dbInfo.id] = sprite
        }
    },
    
    removePlayer: function(id){
        console.log(id)
        this.spriteMap.players[id].kill();
        delete this.spriteMap.players[id]
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
    }
}

// combine playerControll and Game
LoM.Game = Object.assign(LoM.Game,playerControl)