// DEPENDENCIES
// -------------------------------------------------------------
const express = require('express');
const app = express();
const hdbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path = require('path');
const http = require('http');
// const WebSocket = require('ws');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const db = require('./app/models');
const fs = require('fs');
const sequelize_fixtures = require('sequelize-fixtures');

// External Logics
// -------------------------------------------------------------


// fs.readdir(spriteSheetFolder, (err, files) => {
//     files.forEach(file => {
//       console.log('this is',file);
//     });
// })

    


// INITIALIZING SERVER
// -------------------------------------------------------------
var port = process.env.PORT || 3030;

app.engine('handlebars', hdbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app/views/layouts')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'app/views/'));
app.set( 'port', ( process.env.PORT || 3030 ))
// app.set('trust proxy', 1) // trust first proxy 
app.use(cookieParser('keyboard cat'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// Init passport authentication 
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/app/public/')));



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 10000000000000000000}));


// INTIALIZING ROUTERS
// -------------------------------------------------------------
app.use('/', require(path.join(__dirname, '/app/routes/html_controller.js')));
app.use('/user', require(path.join(__dirname, '/app/routes/users_controller.js')));
app.use('/messages', require(path.join(__dirname, '/app/routes/messages_controller.js')));
app.use('/game', require(path.join(__dirname, '/app/routes/game_controller.js')));

// INTIALIZING SOCKET.IO
// -------------------------------------------------------------
var server = http.createServer(app);
var io = require('socket.io')(server)
// server.listen(port)
// load chat ws
require(path.join(__dirname, './app/ws/chatSIO.js'))(io);

// load main game ws
require(path.join(__dirname, './app/ws/gameSIO.js'))(io);

// load battle ws
require(path.join(__dirname, './app/ws/battleSIO.js'))(io);


// STARTING DB AND SERVER
// -------------------------------------------------------------
var restart = false;
// var restart = true;

if(restart){
db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null, {raw: true})
    .then(function(result){
        db.sequelize.sync(
            {force: true}   
        ).then(() => {
        //from file 
            sequelize_fixtures.loadFiles(['./app/fixtures/User1.json','./app/fixtures/User2.json','./app/fixtures/Items.json','./app/fixtures/Spells.json'], db).then(function(){
                server.listen(port, () => {
                console.log('listen to port',port)
                })
             })
         })
    })
}else{

    db.sequelize.sync(
        // {force: true}   
    ).then(() => {
        server.listen(port, () => {
            console.log('listen to port',port)
        })
    })
    
}