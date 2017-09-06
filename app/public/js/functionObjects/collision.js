var LoM = LoM || {}

var collisions = {};

collisions = {
    setCollisions: function(){
        
        this.genLayerCollisions('Houses','wallCollisions',
            [],
            this.wallCollisions
        ); 

        this.genLayerCollisions('Houses','shop',
            [1595],
            this.shopInteractions
        )
        this.genLayerCollisions('Houses','inn',
            [147],
            this.innInteractions
        )
        
    }
}

// combine collisions and Game
LoM.Game = Object.assign(LoM.Game,collisions)