var Client = function(){
    
    this.socket = io.connect('http://localhost:8080');

    this.test = function(){
        console.log('request received')
        this.socket.emit('testing','testing-data')
    }

    this.userInfoDB = function(){
        this.socket.emit('user')
    };

    this.move = function(dir){
        this.socket.emit('key-pressed',dir)
    }

    this.socket.on('allplayers', function(data){
        // data.forEach(function(user){
        //     console.log(user)
        //     LoM.Game.newSprite(user)
        // })
    })

    this.socket.on('move', function(data){
        LoM.Game.movePlayer(data.player.id,data.player.x,data.player.y,data.dir)
    })

    this.socket.on('start', function(data){
        LoM.Game.userInfo = data;
        LoM.game.state.start('Game')
    })
    this.socket.on('render-user', function(data){
        console.log('render user')
        LoM.Game.renderUser(data)
    })
}



