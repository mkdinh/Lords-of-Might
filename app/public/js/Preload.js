var LoM = LoM || {};

LoM.playerDB = {};

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

        // generate user game profile
        var user = {
            id: userID,
            role: 'player',
            world:{x:randomInt(350,500),y:randomInt(350,500), location: 'Game'},
            velocity: {x:0,y:0},
            sprite: 'sprite'+userID,
            stats:{
                attack: sprite.attack,
                defense: sprite.defense,
                speed: sprite.speed,
                heal: sprite.heal
            },
            equipments: {
                weapon: parsePNG(sprite.weapon),
                spell: parsePNG(sprite.spell),
                head: parsePNG(sprite.head),
                torso: parsePNG(sprite.torso),
                leg: parsePNG(sprite.leg),
                body: parsePNG(sprite.body)
            }
        }
        console.log(user)
        LoM.playerMaster = {};
        LoM.spriteMaster = {};

        Client.userInfoDB(user);
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