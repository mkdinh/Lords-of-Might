// -------------------------------------------------------------------------------------------
// INITALIZING GAME STATE 
// -------------------------------------------------------------------------------------------
// setting up rpg canvas by declaring single rpg state with div id='rpg'

var LoM = LoM || {};

LoM.Game = function(){};

LoM.Game = {
    // -------------------------------------------------------------------------------------------
    // INITALIZING GAME STATE
    // -------------------------------------------------------------------------------------------
    init:function(){
        this.stage.disableVisibilityChange = true;
    },

    // -------------------------------------------------------------------------------------------
    // CREATE GAME STATE
    // -------------------------------------------------------------------------------------------    
    create: function(){

        // GAME VIEWS INITIALIZATION
        // -----------------------------------------------------------
        this.gameReady = false;
        
        // generate data map
        this.groupMap = {}
        this.spriteMap = {}

        // generate children objects for this.groupMap and this.spriteMap
        // this allow any element generated by the game to be trackable and refer to later
        // look at generator.js for details
        this.genDataMap(['tileMap','layers','collisions','players','npcs','enemies','objects']);
        
        // Generate Layer Collisions
        // -----------------------------------------------------------------------
        
        // set collision events for the game for user interactions
        // look at collisions for more dtails
        this.setCollisions()

        // generate all online users accessing the game
        for(i = 0; i < this.playerArray.length;i++){
            this.addPlayer(this.playerArray[i])
        }

        var sprite2Info = {
            id: '1',
            sprite: 2,
            role: 'npc',
            name: 'sample',
            velocity: {x: -10, y: 0},
            world: {x: 400,y:400}
        }
        
        this.addPlayer(sprite2Info);
        this.sprite2 = this.groupMap.npcs['sample'];

        // after all players is load for the current user, the game start
        // this prevent update from running before all the players is loaded
        this.gameReady = true;

        // ENABLE KEYBOARD INPUT
        // --------------------------------------------------------------
        this.cursor = this.input.keyboard.createCursorKeys();  
    },

    // -------------------------------------------------------------------------------------------
    // UPDATING GAME STATE
    // -------------------------------------------------------------------------------------------    
    update: function(){
        
        // if all player data is loaded, start the game update
        if(this.gameReady){ 
            
            // check through all the collisions set in create 
           this.checkLayerCollisions();
            
            // update world position 
            var worldX = this.spriteMap.players[this.userInfo.id].worldPosition.x;
            var worldY = this.spriteMap.players[this.userInfo.id].worldPosition.y

            // listen for key press for character movement and pass that information to socket.io
            // if the last key pressed was 100ms ago, then listen stop updating to server 
            if(!this.eventOccur){
                if(this.cursor.up.isDown){
                    Client.move({dir:'up', id: this.userInfo.id,  worldX: worldX, worldY: worldY });
                }else if(this.cursor.down.isDown){;
                    Client.move({dir: 'down', id: this.userInfo.id, worldX: worldX, worldY: worldY });
                }else if(this.cursor.left.isDown){
                    Client.move({dir:'left', id: this.userInfo.id,  worldX: worldX, worldY: worldY })
                }else if(this.cursor.right.isDown){
                    Client.move({dir:'right', id: this.userInfo.id,  worldX: worldX, worldY: worldY })
                }else if(this.input.keyboard.upDuration(37,100)|| this.input.keyboard.upDuration(38,100) || this.input.keyboard.upDuration(39,100) || this.input.keyboard.upDuration(40,100)){
                    Client.move({dir:'stationary', id:this.userInfo.id,   worldX: worldX, worldY: worldY})
                }
            }
        }
    },

    render: function(){
        // this.debug.spriteInfo(this.playerMap[userInfo.id], 32, 32);
    },

    randomInt: function (low,high){
        return Math.floor(Math.random() * (high - low) + low);
    },

    checkLayerCollisions: function(){
        // listen to player-npc and player-player interactions
        this.physics.arcade.collide(this.groupMap.players, this.groupMap.players, this.playerInteractions, null, this);
        this.physics.arcade.collide(this.groupMap.players, this.groupMap.npcs, this.npcInteractions, null, this);
        
        // listen for collision interactions
        for(var collision in this.spriteMap.collisions){
            this.physics.arcade.collide(this.groupMap.players, this.spriteMap.collisions['buildingOutlines'],this.spriteMap.collisions['buildingOutlines'].data['onCollide'], null, this);
        }
    }
}
