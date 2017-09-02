var Client = {};

Client.socket = io.connect();

Client.userInfoDB = function(){
    this.socket.emit('user')
};


Client.socket.on('render-user', function(data){
    console.log('render user')
    console.log(data)
    LoM.Game.renderUser(data.new)
})

Client.move = function(movement){
    this.socket.emit('key-pressed',movement)
}

Client.socket.on('start', function(data){
    console.log(data)
    LoM.Game.userInfo = data.user;
    LoM.Game.playerArray = data.others
    LoM.game.state.start('Game')
})

Client.socket.on('move', function(data){
    // console.log(data)
    LoM.Game.movePlayer(data)
})

Client.socket.on('remove',function(data){
    console.log('removed',data.id)
    LoM.Game.removePlayer(data.id)

})



// var Client = function(){
    
//     this.socket = io.connect('http://localhost:8080');

//     this.test = function(){
//         console.log('request received')
//         this.socket.emit('testing','testing-data')
//     }

//     this.userInfoDB = function(){
//         this.socket.emit('user')
//     };


//     this.move = function(dir){
//         this.socket.emit('key-pressed',dir)
//     }

//     this.socket.on('allplayers', function(data){
//         console.log(data)
//         // for(i = 0; i < data.length; i++){
//         //     if(data[i].id !== LoM.Game.userInfo.id){
//         //         console.log(data[i])
//         //         LoM.Game.newSprite(data[i])
//         //     }
//         // }
//     })

//     this.socket.on('move', function(data){
//         LoM.Game.movePlayer(data.player.id,data.player.x,data.player.y,data.dir)
//     })

//     this.socket.on('start', function(data){
//         LoM.Game.userInfo = data;
//         LoM.game.state.start('Game')
//     })
//     this.socket.on('render-user', function(data){
//         console.log('render user')
//         LoM.Game.renderUser(data)
//     })
// }



