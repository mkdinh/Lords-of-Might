var LoM = LoM || {};

LoM.player = {

    add: function(dbInfo){
        // generating sprite
        var sprite;
        var state = dbInfo.world.state;

        // console.log(dbInfo)
        // console.log(dbInfo.world.state)

        switch(dbInfo.world.state){
            case 'Town':
                sprite =  LoM[state].add.sprite(dbInfo.world.x, dbInfo.world.y, dbInfo.sprite);
                break
            case 'Shop':
                if(dbInfo.role === "player"){
                    console.log(dbInfo)
                    // console.log(dbInfo.id)
                    sprite =  LoM[state].add.sprite(446, 550, dbInfo.sprite);
                }else{
                    sprite =  LoM[state].add.sprite(dbInfo.world.x, dbInfo.world.y, dbInfo.sprite);
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
            // console.log(sprite.data.id)
        });
        if(dbInfo.role === 'player'){
    
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(LoM.interaction.playerInteractions, LoM[state]);
            sprite.events.onInputOver.add(LoM.interaction.pointerOverIndicator, LoM[state]);
            sprite.events.onInputOut.add(LoM.interaction.pointerOutIndicator, LoM[state]);
            sprite.input.useHandCursor = true;
        }
        
        if(dbInfo.role === 'npc'){
            // console.log(sprite.role)
            sprite.body.onCollide.add(LoM.interaction.npcInteractions,this)
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
        sprite.body.collideWorldBounds = true;
        
        // Setting player physics
        sprite.body.collideWorldBounds = true;
        
        // setting display label
        var style = { font: "12px Arial", fill: "#000000",align:'center',boundsAlignH:'center', backgroundColor:'rgba(255,255,255,.3)'};

        if(dbInfo.role === 'player'){ 
            var label = LoM[state].add.text(0, 0,dbInfo.name, style); 
            label.anchor.set(0.5)
            label.position.x += ((sprite.width/2)+(sprite.width - label.width)/2)
            // label.position.x -= label.width * 0.5;
            // label.position.y -= label.height * 0.5;
        }else{
            var label= LoM[state].add.text(0,0,dbInfo.name, style);
            label.anchor.set(0.5)
            label.position.x += ((sprite.width)+(sprite.width - label.width)/2)
        }

        sprite.addChild(label);
        // console.log(dbInfo)
        if(dbInfo.role === 'npc'){
            LoM[state].groupMap.npcs.add(sprite)
            LoM[state].world.bringToTop(LoM[state].groupMap.npcs);
            
        }else{
            LoM[state].groupMap.players.add(sprite)
            LoM[state].world.bringToTop(LoM[state].groupMap.players);
            LoM.spriteMaster[dbInfo.id] = sprite;
            LoM.playerMaster[dbInfo.id] = dbInfo;
            // console.log(LoM.spriteMaster)
        }

        if(dbInfo.id === LoM.Town.userInfo.id){
            LoM[state].camera.follow(sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            // console.log(sprite.body)
        }

        if(dbInfo.role === 'player'){
            LoM.generator.genAnimations(sprite)
        }else{
                sprite.frame = 19
        }
        // Keep track of total players
        // console.log(sprite)
        if(dbInfo.role === 'npc'){
            LoM[state].spriteMap.npcs[dbInfo.id] = sprite
        }else{
            LoM[state].spriteMap.players[dbInfo.id] = sprite
        }
    },
    
    remove: function(player){
        console.log(player)
        console.log(LoM.spriteMaster)
        if(player.id !== undefined && LoM.spriteMaster[player.id] !== undefined){
            console.log(player)
            LoM[player.state].spriteMap.players[player.id].kill();

            delete LoM[player.state].spriteMap.players[player.id]
            delete LoM.playerMaster[player.id]
        }
    },

    // retrieve proper sprite movement
    move: function(dirInfo){
        // console.log(dirInfo)
        var state = dirInfo.player.world.state;
        var id = LoM.userInfo.id;
            // console.log(state,id)
        if(state === LoM.playerMaster[id].world.state){

            var player = LoM.spriteMaster[dirInfo.player.id];
            player.body.velocity.x = dirInfo.player.velocity.x;
            player.body.velocity.y = dirInfo.player.velocity.y;
            
            //  update player position
            LoM.playerMaster[dirInfo.player.id].world.x = dirInfo.player.world.x;
            //  update player position
            LoM.playerMaster[dirInfo.player.id].world.y = dirInfo.player.world.y;

            // console.log(dirInfo.player.world.x,dirInfo.player.world.y)

            // play animation
            if(dirInfo.player.velocity.x === 0 && dirInfo.player.velocity.y === 0){
                player.animations.stop()
            }else{
                player.animations.play(dirInfo.dir,10,false)
            }
        }
    },

    getCoordinates: function(layer,pointer){
        // Client.sendClick(pointer.worldX,pointer.worldY);
    }
}

// combine playerControll and Town
// LoM.Town = Object.assign(LoM.Town,playerControl)
// LoM.Shop = Object.assign(LoM.Shop,playerControl)
// LoM.Caslte = Object.assign(LoM.Castle,playerControl)