var LoM = LoM || {};

var interaction = {};


interaction = {

    npcInteractions: function(player,npc){
        if(player.data.role === 'player'){
            player = player
            npc = npc
        }else{
            var placeholder = player;
            player = npc;
            npc = placeholder
        }
        
        if(this.eventActive.state === false){
            switch(npc.data.name){
                case 'Mysterious Stranger':
                    console.log(this.eventActive.state)
                    this.eventActive.state = true
                    return
                
                case 'Shop Owner':
                    console.log('talk to shop owner')
                    this.eventActive.state = true
                    return           
            }
            this.eventActive.state = true;
        }
    },

    playerInteractions: function(target){
        if(this.eventActive.state === false){
            if(target.data.id !== this.userInfo.id){
                this.battleInfo.initiator = this.spriteMap.players[this.userInfo.id].data
                this.battleInfo.receiver = this.spriteMap.players[target.data.id].data
                genBattleInteraction()
                // setTimeout(function(){removeInteractionDisplay()},10000)
            }else{
                removeInteractionDisplay()
                console.log('why keep hitting yourself?')
                return;
            }
            this.eventActive.state = true
        }
    },

    pointerOverIndicator(target){
        target.alpha = 0.5
    },

    pointerOutIndicator(target){
        target.alpha = 1
    },
    
    wallCollisions: function(){
        if(!this.eventActive.state){
            console.log('hit a wall')
            this.eventActive.state = true
        }
    },

    shopInteractions: function(player,building){
        if(!this.eventActive.state){
            // announcement('New Shop! Open Soon!')
            LoM.playerMaster[LoM.userInfo.id].world.state = "Shop"
            var user = LoM.playerMaster[LoM.userInfo.id]

            console.log('hey')
            Client.changeState(user);

        this.eventActive.state = true;
        }
    },

    innInteractions: function(player,building){
        if(!this.eventActive.state){
            // console.log(building)
            // if(building.role === 'shop'){
                var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 400, align: "center", backgroundColor: "#ffff00" };
                
                var t = this.add.text(this.camera.x + (this.width/2), this.camera.y + (this.height/2), "New inn, open soon!", style);
                t.fixedToCamera = true;
                t.cameraOffset.setTo(200, 500);
                setTimeout(function(){t.destroy()},4000)
            // }
        this.eventActive.state = true;
        }
    }

}
// combine interaction object and Town
LoM.Town = Object.assign(LoM.Town,interaction);
LoM.Shop = Object.assign(LoM.Shop,interaction);
LoM.Castle = Object.assign(LoM.Castle,interaction)