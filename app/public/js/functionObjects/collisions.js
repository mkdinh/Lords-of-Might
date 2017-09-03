var LoM = LoM || {}

var collisions = {};

collisions = {
    setCollisions: function(){
        
        this.genLayerCollisions('Houses','shop',
            [1596],
            this.buildingInteractions
        )
        
        this.genLayerCollisions('Houses','buildingOutlines',
            [65,66,67,68,69,85,124,144,165,166,146,147,148,149,129,128,127,107,89,1475,1476,1493,1494,1495,1496,1512,1513,1514,1515,1516,1517,],
            this.buildingInteractions
        ); 
    }
}

// combine collisions and Game
LoM.Game = Object.assign(LoM.Game,collisions)