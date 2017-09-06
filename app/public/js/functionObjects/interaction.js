var LoM = LoM || {};

var interaction = {};


interaction = {

    spriteCollisions: function(oldPlayer,newPlayer){
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
            console.log(building)
            // if(building.role === 'shop'){
                var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 400, align: "center", backgroundColor: "#ffff00" };
                
                var t = this.add.text(this.camera.x + (this.width/2), this.camera.y + (this.height/2), "New shop, open soon!", style);
                t.fixedToCamera = true;
                t.cameraOffset.setTo(200, 500);
                setTimeout(function(){t.destroy()},4000)
            // }
        this.eventActive.state = true;
        }
    },

    innInteractions: function(player,building){
        if(!this.eventActive.state){
            console.log(building)
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
// combine interaction object and Game
LoM.Game = Object.assign(LoM.Game,interaction)