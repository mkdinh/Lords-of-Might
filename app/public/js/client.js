var Client = {};

Client.socket = io.connect('http://localhost:8080');

Client.userInfoDB = function(){
    this.socket.emit('user')
};


Client.socket.on('render-user', function(data){
    console.log('render user')
    console.log(data)
    LoM.Game.renderUser(data.new)
})

Client.move = function(dir,id){
    this.socket.emit('key-pressed',{dir:dir,id:id})
}

Client.socket.on('start', function(data){
    console.log(data)
    LoM.Game.userInfo = data.user;
    LoM.Game.playerArray = data.others
    LoM.game.state.start('Game')
})

// Client.socket.on('allplayers', function(data){
//         var data = [{id: 123,x: 250,y: 250,sprite: 5},  {id: 1245,x: 300,y: 250,sprite: 5}];
//         console.log(data)
//         for(i = 0; i < data.length; i++){
//             if(data[i].id !== LoM.Game.userInfo.id){
//                 LoM.Game.newSprite(data[i])
//             }
//         }
// })

Client.socket.on('move', function(data){
    // console.log(data)
    LoM.Game.movePlayer(data)
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



