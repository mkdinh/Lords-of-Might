var LoM = LoM || {};
var battleInfo = {};
var room;
var user;

// loading game assets
LoM.Battle = function(){};

LoM.Battle = {
    preload: function(){
        var width = 24*32;
        var height = 17*32;

        this.backgroundSprite = this.game.add.tileSprite(0,0, width, height, 'battleBG');
        this.backgroundSprite.scale.x = 3.2  
        this.backgroundSprite.scale.y = 3.2  
        
        this.load.spritesheet('sprite5','img/sprites/sample.png',64,64,273);
        this.load.spritesheet('sprite6','img/sprites/6.png',64,64,273);

        this.battleInfo = LoM.Game.battleInfo;
        user = LoM.Game.userInfo;
    },
    create: function(){
        this.spriteMap = {}

        this.createReceiver(this.battleInfo.receiver)
        this.createInitiator(this.battleInfo.initiator)
        battleUpdate();
    },
    update: function(){

    },
    render: function(){
        // LoM.debug.geom(menu,'#0fffff');
    },

    createInitiator: function(info){
        // console.log(info)
        var sprite =  this.add.sprite(160, 230, 'sprite6');
        sprite.frame = 40;
        sprite.scale.x = 2;
        sprite.scale.y = 2;

        sprite.data.position = "initiator";
        sprite.data.weapon = {};
        sprite.data.weapon.type = 'sword';

        this.battleInfo.initiator.position = "initiator";

        this.addBattleAnimations(sprite)

        this.spriteMap[info.id] = sprite
    },

    createReceiver: function(info){
        
        this.battleInfo.receiver.position = "receiver";

        var sprite =  this.add.sprite(515, 230, 'sprite5');
        sprite.frame = 13;
        sprite.scale.x = 2;
        sprite.scale.y = 2;
        
        sprite.data.position = "receiver";
        sprite.data.weapon = {};
        sprite.data.weapon.type = 'sword';



        this.addBattleAnimations(sprite)

        this.spriteMap[info.id] = sprite
    },

    addBattleAnimations: function(sprite){
        if(sprite.data.position === 'initiator'){
            sprite.animations.add('spell',[39,40,41,42,43,44,44,44,44,44,44,44,44,43,42,41,40,39],true)
            sprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            sprite.animations.add('right',[144,145,146,147,148],true);
            sprite.animations.add('sword',[195,196,197,198,199,200,199,198,197,196,195],true);
            sprite.animations.add('spear',[247,248,249,250,251,252,253,254,255,255,254,253,252,251,250,249,248,247],true);
            sprite.animations.add('bow',[247,248,249,250,251,252,253,254,255,256,257,258,259],true);
            sprite.animations.add('die',[260,261,262,263,264,265],true)
            
        }else if(sprite.data.position === 'receiver'){
            console.log(sprite)
            sprite.animations.add('spell',[13,14,15,16,17,18,18,18,18,18,18,18,18,17,16,15,14,13],true)
            sprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            sprite.animations.add('right',[144,145,146,147,148],true);
            sprite.animations.add('sword',[169,170,171,172,173,174,173,172,171,170,169],true);
            sprite.animations.add('spear',[221,222,223,224,225,226,227,228,229,229,228,227,226,225,224,223,222,221],true);
            sprite.animations.add('bow',[221,222,223,224,225,226,227,228,229,229,228,227,226,225,224,223,222,221],true);
            sprite.animations.add('die',[260,261,262,263,264,265],true)
        }
    },

    attack: function(battleInfo,id){
        this.spriteMap[id].animations.play('sword', 10,  false)
    },
    spell: function(battleInfo,id){
        console.log(id)
        this.spriteMap[id].animations.play('spell', 10,  false)
    },
    potion: function(battleInfo,id){
        this.spriteMap[id].animations.play('die', 10,  false)
    }
}

