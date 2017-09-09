var LoM = LoM || {};

LoM.generator = {}; 

LoM.generator = function(){};

LoM.generator = {
    
    genDataMap: function(array){
        
        // object of the current game state
        var state = LoM.userInfo.world.state;

        // generate data map to store game object
        array.forEach(function(group){

            LoM[state].groupMap[group] = {}
            LoM[state].groupMap[group] = LoM[state].add.group();
            LoM[state].groupMap[group].enableBody = true;
            LoM[state].groupMap[group].physicsBodyType = Phaser.Physics.ARCADE;
            LoM[state].spriteMap[group] = {};

            if(group === 'players'){
                group.inputEnableChildren = true;
            }
        })
    },

    genLayers: function(state,key){
        // generate layers
        for(var i = 0; i < LoM[state].spriteMap.tileMap[key].layers.length; i++) {
            LoM[state].groupMap.layers.add(LoM[state].spriteMap.tileMap[key].createLayer(i));
        };

        // this.spriteMap.layers.children.forEach(function(layer){
        //     layer.debug = true;
        // })
    },

    genLayerCollisions: function(layer,key,tileArray,interaction){
        // object of the current game state
        var state = LoM.userInfo.world.state;
        
        // SET LAYERS COLLISION WITH SRPITES
        // -------------------------------------------------------------
        LoM[state].spriteMap.tileMap[key] = LoM[state].add.tilemap('map');
        LoM[state].spriteMap.tileMap[key].addTilesetImage('tilesheet','tileset');
  
        var layerIndex = LoM[state].spriteMap.tileMap[key].getLayer(layer);
        var layerData = LoM[state].spriteMap.tileMap[key].layers[layerIndex];
        
        // set map collision
    
        LoM[state].spriteMap.tileMap[key].setCollision(tileArray,true,layer,true);

        LoM[state].spriteMap.collisions[key] = LoM[state].spriteMap.tileMap[key].createLayer(layer)
        LoM[state].spriteMap.collisions[key].debug = true
        LoM[state].spriteMap.collisions[key].data = {}
        LoM[state].spriteMap.collisions[key].data['role'] = key
        LoM[state].spriteMap.tileMap[key].createLayer(layer);
        // setting collision data
        LoM[state].spriteMap.collisions[key].data['onCollide'] = interaction; 
        
        // render all other layer once
        if(Object.keys(LoM[state].spriteMap.tileMap).length === 1){
            // generate layerx and layer collisions
            LoM.generator.genLayers(state,key);
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
// LoM.Town = Object.assign(LoM.Town,generator)
// LoM.Shop = Object.assign(LoM.Shop,generator)
// LoM.Castle = Object.assign(LoM.Castle,generator)