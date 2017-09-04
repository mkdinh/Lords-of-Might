var LoM = LoM || {};

playerControl = {

    addPlayer : function(dbInfo){
        // console.log(dbInfo)
        // generating sprite
        var sprite;
        dbInfo.sprite = 4
        var spriteNum = dbInfo.sprite; 
        var avatar = 'sprite' + spriteNum;
        sprite =  this.add.sprite(dbInfo.world.x, dbInfo.world.y, avatar);
        sprite.data = dbInfo;

        sprite.body.maxVelocity.x = 100;
        sprite.body.maxVelocity.y = 100;
        sprite.body.bounce.x = 0;
        sprite.body.bounce.y = 0;

        // Setting player physics
        sprite.body.collideWorldBounds = true;
    
        var style = { font: "12px Arial", fill: "#000000",align:'center'};  
        var label_score = this.add.text(8, -15,dbInfo.id, style);
        sprite.addChild(label_score);

        if(dbInfo.role === 'npc'){
            this.groupMap.npcs.add(sprite)
            this.world.bringToTop(this.groupMap.npcs);
        }else{
            this.groupMap.players.add(sprite)
            this.world.bringToTop(this.groupMap.players);
        }

        if(dbInfo.id === this.userInfo.id){
            this.camera.follow(sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
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
    }
}

// combine playerControll and Game
LoM.Game = Object.assign(LoM.Game,playerControl)