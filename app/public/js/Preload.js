var LoM = LoM || {};

LoM.playerDB = {};
LoM.playerControl = {};
LoM.eventActive = {state: false};
LoM.playerMaster = {};
LoM.spriteMaster = {};

// loading game assets
LoM.Preload = function(){};

LoM.Preload = {
    preload: function(){
        // show logo in loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo') 
        this.splash.anchor.setTo(0.5);
    
    // load game assets
    $.ajax({
        url: '/game/all',
        method: "GET",
        success: function(playerDB){
            
            // for each player, load the info into a LoM key called LoM.playerDB
            // load the spritesheet with an id key into the game
            for(let i = 0; i < playerDB.length; i++){
                let playerID = playerDB[i].id;
                LoM.playerDB[playerID] = playerDB[i]
                LoM.Preload.load.spritesheet('sprite'+playerID,'img/players/'+playerID+'.png',64,64,273)
            }
        }
    });

    console.log(LoM.playerDB)
    this.load.image('battleBG','/img/battleBG.png')
    this.load.tilemap('map', 'img/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('tileset', 'img/map/tilesheet.png',32,32);
    this.load.atlas('sprite1', 'img/sprites/1.png', 'img/sprites/1.json');
    this.load.spritesheet('sprite2','img/sprites/2.png',64,64,36); // this will be the sprite of the players
    this.load.spritesheet('sprite3','img/sprites/3.png',63,63,36); // this will be the sprite of the players
    this.load.spritesheet('sprite4','img/sprites/4.png',64,64,36); // this will be the sprite of the players
    this.load.spritesheet('sprite5','img/sprites/5.png',64,64,273);
    this.load.spritesheet('sprite6','img/sprites/6.png',64,64,273);
    this.load.spritesheet('fireball','img/sprites/lpc/spells/fireball.png',126,124,38);
    this.load.spritesheet('health','img/sprites/health.png',113,120)

    },
    create: function(){
        // grab user from localStorage
        var userLocalStor = JSON.parse(localStorage.getItem('user'));
        var userID = userLocalStor.user_id; 
        var userDB = LoM.playerDB[userID];
        var sprite = userDB.Sprite;
        // console.log(userDB)

        // generate user game profile
        var user = {
            id: userID,
            name: userDB.name,
            online: true,
            role: 'player',
            world:{
                x: userDB.Game_State.lastX ,
                y: userDB.Game_State.lastY, 
                state: userDB.Game_State.state
            },
            velocity: {x:0,y:0},
            sprite: 'sprite'+userID,
            stats: userDB.Stat,
            equipments: {
                weapon: parsePNG(sprite.weapon),
                spell: parsePNG(sprite.spell),
                head: parsePNG(sprite.head),
                torso: parsePNG(sprite.torso),
                leg: parsePNG(sprite.leg),
                body: parsePNG(sprite.body)
            }
        }

        LoM.userInfo = user

        // ENABLE KEYBOARD INPUT
        // --------------------------------------------------------------
        LoM.cursor = LoM.game.input.keyboard.createCursorKeys();  
        LoM.game.input.keyboard.addKey(Phaser.Keyboard.W)
        LoM.game.input.keyboard.addKey(Phaser.Keyboard.A)
        LoM.game.input.keyboard.addKey(Phaser.Keyboard.S)
        LoM.game.input.keyboard.addKey(Phaser.Keyboard.D)

        Client.userInfoDB(user);
    }
};

LoM.playerControl.eventListener = function(worldX,worldY){
     //  if no event is active
     if(LoM.eventActive.state){
         if(!LoM.eventActive.lastLocationSaved){
             LoM.eventActive.lastLocation = {
                 x: LoM.spriteMaster[LoM.userInfo.id].x,
                 y: LoM.spriteMaster[LoM.userInfo.id].y      
             } 
             LoM.eventActive.lastLocationSaved = true
         }else{
             var lastLocation = LoM.eventActive.lastLocation
             var dX = worldX - lastLocation.x;
             var dY = worldY - lastLocation.y;
             var distance = Math.sqrt( Math.pow(dX, 2) + Math.pow(dY, 2));
             if(distance > 20){
                 LoM.eventActive.state = false;
                 LoM.eventActive.player = {};
                 LoM.eventActive.target = {};
                 LoM.eventActive.lastLocationSaved = false;
                 console.log('reset event')
                 removeInteractionDisplay()
             }
         }
     }
};

LoM.playerControl.controlInput = function(worldX,worldY){
    if(LoM.game.input.keyboard.isDown(Phaser.Keyboard.W)){  
        Client.move({dir:'up', id: LoM.userInfo.id,  worldX: worldX, worldY: worldY, state: LoM.userInfo.world.state});
    }else if(LoM.game.input.keyboard.isDown(Phaser.Keyboard.S)){;
        Client.move({dir: 'down', id: LoM.userInfo.id, worldX: worldX, worldY: worldY, state: LoM.userInfo.world.state});
    }else if(LoM.game.input.keyboard.isDown(Phaser.Keyboard.A)){
        Client.move({dir:'left', id: LoM.userInfo.id,  worldX: worldX, worldY: worldY, state: LoM.userInfo.world.state})
    }else if(LoM.game.input.keyboard.isDown(Phaser.Keyboard.D)){
        Client.move({dir:'right', id: LoM.userInfo.id,  worldX: worldX, worldY: worldY, state: LoM.userInfo.world.state})
    }else if(LoM.game.input.keyboard.upDuration(65,75)|| LoM.game.input.keyboard.upDuration(87,75) || LoM.game.input.keyboard.upDuration(83,75) || LoM.game.input.keyboard.upDuration(68,75)){
        Client.move({dir:'stationary', id:LoM.userInfo.id, worldX: worldX, worldY: worldY, state: LoM.userInfo.world.state})
    }
}

var parsePNG = function(url){
    var parsedURL = url.split('/')
    var imgFile = parsedURL[parsedURL.length-1];
    var filename = imgFile.split('.')[0];
    return filename;
}

function randomInt (low,high){
    return Math.floor(Math.random() * (high - low) + low);
}