var Client = {};

Client.socket = io.connect('http://localhost:8080');

Client.askNewPlayer = function(){
    Client.socket.emit('newPlayer')
};

Client.socket.on('new', function(data){
    console.log('new player', data)
    Game.addNewPlayer(data.id,data.x,data.y,data.sprite)
})

Client.socket.on('allplayers', function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,data[i].sprite)
    }
})

Client.sendClick = function(x,y){
    Client.socket.emit('click',{x:x,y:y})
}


Client.move = (function(dir){
    Client.socket.emit('move',dir)

})

Client.socket.on('move', function(data){
    Game.movePlayer(data.player.id,data.player.x,data.player.y,data.dir)
})



