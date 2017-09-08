var LoM = LoM || {};

playerControl = {

    addPlayer : function(dbInfo){
        // generating sprite
        var sprite;
        var spriteNum = dbInfo.sprite; 
        var avatar = 'sprite' + spriteNum;
        // console.log(dbInfo)
        // console.log(dbInfo.world.location)

        switch(dbInfo.world.location){
            case 'Game':
                sprite =  this.add.sprite(dbInfo.world.x, dbInfo.world.y, avatar);
                // console.log(sprite)
                break
            case 'Shop':
                if(dbInfo.role === "player"){
                    // console.log(dbInfo.id)
                    sprite =  this.add.sprite(446, 550, avatar);
                }else{
                    sprite =  this.add.sprite(dbInfo.world.x, dbInfo.world.y, avatar);
                }
                break
        }

        sprite.data = dbInfo;
        // console.log(sprite)
        // console.log(sprite.data)
        sprite.eventActive = false;
        sprite.body.onCollide = new Phaser.Signal()
        sprite.body.onCollide.add(function(){
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
            console.log(sprite.data.id)
        });
        if(dbInfo.role === 'player'){
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(this.playerInteractions, this);
            sprite.events.onInputOver.add(this.pointerOverIndicator, this);
            sprite.events.onInputOut.add(this.pointerOutIndicator, this);
            sprite.input.useHandCursor = true;
        }
        
        if(dbInfo.role === 'npc'){
            // console.log(sprite.role)
            sprite.body.onCollide.add(this.npcInteractions,this)
        }

        // console.log(sprite)

        if(dbInfo.role === 'npc'){
            sprite.body.immovable = true;
        }
        
        sprite.lastLocation = {};
        sprite.frame = 27;
        sprite.body.maxVelocity.x = 100;
        sprite.body.maxVelocity.y = 100;
        sprite.body.bounce.x = 0;
        sprite.body.bounce.y = 0;

        // Setting player physics
        sprite.body.collideWorldBounds = true;
        
        // setting display label
        var style = { font: "12px Arial", fill: "#000000",align:'center',boundsAlignH:'center', backgroundColor:'rgba(255,255,255,.3)'};

        if(dbInfo.role === 'player'){ 
            var label = this.add.text(0, 0,dbInfo.id, style); 
            label.anchor.set(-0.2,0.3);  
        }else{
            var label= this.add.text(0,0,dbInfo.name, style);
            label.anchor.set(0.2,0.6);
        }

        sprite.addChild(label);

        if(dbInfo.role === 'npc'){
            this.groupMap.npcs.add(sprite)
            this.world.bringToTop(this.groupMap.npcs);
        }else{
            this.groupMap.players.add(sprite)
            this.world.bringToTop(this.groupMap.players);
            LoM.spriteMaster[dbInfo.id] = sprite;
            LoM.playerMaster[dbInfo.id] = dbInfo;
        }

        if(dbInfo.id === LoM.Game.userInfo.id){
            this.camera.follow(sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            // console.log(sprite.body)
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
        if(id !== undefined && this.spriteMap.players[id] !== undefined && this.spriteMap !== undefined && this.spriteMap.players !== undefined){
            // console.log(this.spriteMap.players)
            this.spriteMap.players[id].kill();
            delete this.spriteMap.players[id]
            delete LoM.playerMaster[id]
        }
    },

    // retrieve proper sprite movement
    movePlayer: function(dirInfo){
        var location = dirInfo.player.world.location;
        var id = LoM.userInfo.id;
        
        if(location === LoM.playerMaster[id].world.location){

            var player = LoM.spriteMaster[dirInfo.player.id];
            player.body.velocity.x = dirInfo.player.velocity.x;
            player.body.velocity.y = dirInfo.player.velocity.y;
            
            // LoM.playerMaster[dirInfo.player.id] = dirInfo.player;
            // console.log(dirInfo.player.world.x,dirInfo.player.world.y)

            // play animation
            if(dirInfo.player.velocity.x === 0 && dirInfo.player.velocity.y === 0){
                player.animations.stop()
            }else{
                player.animations.play(dirInfo.dir,10,false)
            }
        }
    }
}

// combine playerControll and Game
LoM.Game = Object.assign(LoM.Game,playerControl)
LoM.Shop = Object.assign(LoM.Shop,playerControl)
LoM.Caslte = Object.assign(LoM.Castle,playerControl)