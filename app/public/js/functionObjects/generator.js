var LoM = LoM || {};

var generator = {}; 

generator = function(){};

generator = {
    
    genDataMap: function(array){
        
        var gameObj = this;

        // generate data map to store game object
        array.forEach(function(group){

            gameObj.groupMap[group] = {}
            gameObj.groupMap[group] = gameObj.add.group();
            gameObj.groupMap[group].enableBody = true;
            gameObj.groupMap[group].physicsBodyType = Phaser.Physics.ARCADE;
            gameObj.spriteMap[group] = {};

            if(group === 'players'){
                group.inputEnableChildren = true;
            }
        })
    },

    genLayers: function(key){
        // generate layers
        for(var i = 0; i < this.spriteMap.tileMap[key].layers.length; i++) {
            this.groupMap.layers.add(this.spriteMap.tileMap[key].createLayer(i));
        };

        // this.spriteMap.layers.children.forEach(function(layer){
        //     layer.debug = true;
        // })
    },

    genLayerCollisions: function(layer,key,tileArray,interaction){
        
        // SET LAYERS COLLISION WITH SRPITES
        // -------------------------------------------------------------
        this.spriteMap.tileMap[key] = this.add.tilemap('map');
        this.spriteMap.tileMap[key].addTilesetImage('tilesheet','tileset');
  
        var layerIndex = this.spriteMap.tileMap[key].getLayer(layer);
        var layerData = this.spriteMap.tileMap[key].layers[layerIndex];
        
        // set map collision
    
        this.spriteMap.tileMap[key].setCollision(tileArray,true,layer,true);

        this.spriteMap.collisions[key] = this.spriteMap.tileMap[key].createLayer(layer)
        this.spriteMap.collisions[key].debug = true
        this.spriteMap.collisions[key].data = {}
        this.spriteMap.collisions[key].data['role'] = key
        this.spriteMap.tileMap[key].createLayer(layer);
        // setting collision data
        this.spriteMap.collisions[key].data['onCollide'] = interaction; 
        
        // render all other layer once
        if(Object.keys(this.spriteMap.tileMap).length === 1){
            // generate layerx and layer collisions
            this.genLayers(key);
        }     
        // this.layer.inputEnabled = true; 
        // console.log(this.spriteMap.collisions[key])
    },
    
    genAnimations: function(sprite){
        // send movement to server
        spriteNum = sprite.data.sprite
        // console.log(spriteNum)

        // if(spriteNum === 1){
        //     sprite.animations.add('up', Phaser.Animation.generateFrameNames('sprite', 7, 12), 5, true);
        //     sprite.animations.add('down', Phaser.Animation.generateFrameNames('sprite', 1, 6), 5, true);
        //     sprite.animations.add('left', Phaser.Animation.generateFrameNames('sprite', 19, 23), 5, true);
        //     sprite.animations.add('right', Phaser.Animation.generateFrameNames('sprite', 13, 17), 5, true);
        if(spriteNum === 'sprite2' || spriteNum === 'sprite3' || spriteNum === 'sprite4'){
            sprite.animations.add('up',[3,4,5,6],true);
            sprite.animations.add('down',[21,22,23,24],true);
            sprite.animations.add('left',[10,11,12,13],true);
            sprite.animations.add('right',[28,29,30,31],true);
        }else{
        
            sprite.animations.add('up',[105,106,107,108,109,110,111,112],true);
            sprite.animations.add('down',[131,132,133,134,135],true);
            sprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            sprite.animations.add('right',[144,145,146,147,148],true);
        }
        if(sprite.data.role === 'npc'){
            sprite.animations.currentFrame = sprite.animations.play('down',20,false)
            // console.log(sprite.animations)
        }
    }
}

// combine generator and game
LoM.Game = Object.assign(LoM.Game,generator)
LoM.Shop = Object.assign(LoM.Shop,generator)
LoM.Castle = Object.assign(LoM.Castle,generator)