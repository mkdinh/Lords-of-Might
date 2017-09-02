// DECLARING GLOBAL VARIABLES
// --------------------------------------------------------------------
var myChar;
var socket;
var clients = []
var clientNum = 0;

// STARTING GAMEPLAY
// --------------------------------------------------------------------
function startGame(){
    myGameArea.start();
};

// UPDATE GAME AREA
// --------------------------------------------------------------------
function updateGameArea() {
    myGameArea.clear();
    if(myChar){
    myChar.NewPos();
    myChar.update()
    }
}

// UPDATE CLIENTS POSITION
// --------------------------------------------------------------------
setInterval(function(){
    if(clients.length >= 2){
        clients[1].update()
    }
},70)


// INITIALZING CANVAS
// --------------------------------------------------------------------
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
    
        this.canvas.width = 1000;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        $('main').prepend(this.canvas)
        this.interval = setInterval(updateGameArea,30)
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

// INITIALIZING CHAR
// --------------------------------------------------------------------
function char(width, height, color, x ,y, type){
    this.type = type;
    if(type === 'image'){
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y; 
    this.update = function(){
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        socket.emit('newPos',{x: this.x, y: this.y})
    }
    this.NewPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

// CHARACTER MOVEMENT
// --------------------------------------------------------------------
function moveup() {
    myChar.speedY = -2; 
};

function movedown() {
    myChar.speedY = 2; 
};


function moveleft() {
    myChar.speedX = -2;
};

function moveright() {
    myChar.speedX = 2;
};

function stopMovement() {
    myChar.speedX = 0;
    myChar.speedY = 0; 
}

$(window).keyup(function(e){
    if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 ){
        stopMovement()
    }
});

$(window).keydown(function(e){
    switch(e.which){
        case 37:
            moveleft();
            return

        case 38:
            moveup();
            return

        case 39:
            moveright();
            return

        case 40:
            movedown();
            return
    }
});

// START GAMEPLAY
// --------------------------------------------------------------------
$('#add-char').click(function(){
    myChar = new char(200, 200, "https://d30y9cdsu7xlg0.cloudfront.net/png/147469-200.png", 400, 200,  "image")
    socket.emit('joinGame',{},function(){});
    clients[0] = myChar
    console.log(clients)
    startGame();
})



// SOCKET.IO IMPLEMENTATION
// --------------------------------------------------------------------
// intialize socket.io upon onnection
function initalizeIOConn(){
    socket = io.connect('http://localhost:3000');

    socket.on('connect', function(data) {
        // grab user info from localStorage
        // var user = {JSON.parse(localStorage.getItem('user'));}
        var user = {};
        

        socket.on('newChar', function(message){
            console.log('received')
            clients[1] = new char(200, 200, "https://d30y9cdsu7xlg0.cloudfront.net/png/147469-200.png", 400, 200,  "image");
            console.log(clients)
        })
        
        socket.on('myChar', function(myChar){
            // create myChar   
        })


        socket.on('clientPos', function(player){
            if(clients.length >= 2){
                clients[1].x = player.x;
                clients[1].y = player.y;
            }
        })

    })
}


initalizeIOConn()

