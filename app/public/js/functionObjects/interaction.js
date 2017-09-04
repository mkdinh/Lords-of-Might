var LoM = LoM || {};

var interaction = {};


interaction = {

    npcInteractions: function(player,npc){
        player.body.velocity.x = -player.body.speed;
        player.body.velocity.y = -player.body.speed;
        
        npc.body.velocity.x = 0;
        npc.body.velocity.y = 0;
    },
    
    buildingInteractions: function(player,building){
        
        var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 400, align: "center", backgroundColor: "#ffff00" };
        var t = this.add.text(this.camera.x + (this.width/2), this.camera.y + (this.height/2), "New building, open soon!", style);
        t.fixedToCamera = true;
        t.cameraOffset.setTo(200, 500);
        console.log('collide into building');
    },
    
    playerInteractions: function(player1,player2){
        player1.body.velocity.x = -player1.body.speed;
        player1.body.velocity.y = -player1.body.speed;
   
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;

    }
}
// combine generator and Game
LoM.Game = Object.assign(LoM.Game,generator)