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

// External Logics
// -------------------------------------------------------------

var testFolder = path.join(__dirname,'./app/public/img/sprites/lpc');

function traverseDirectory(dirname, callback) {
    var directory = [];
    fs.readdir(dirname, function(err, list) {
      dirname = fs.realpathSync(dirname);
      if (err) {
        return callback(err);
      }
      var listlength = list.length;
      list.forEach(function(file) {
        file = dirname + "\/" + file;
        fs.stat(file, function(err, stat) {
          directory.push(file);
   if (stat && stat.isDirectory()) {
            traverseDirectory(file, function(err, parsed) {
       directory = directory.concat(parsed);
       if (!--listlength) {
         callback(null, directory);
       }
     });
   } else {
       if (!--listlength) {
         callback(null, directory);
       }
            }
        });
      });
    });
  }

var imgPath; 

traverseDirectory(testFolder, function(err, result) {
    if (err) {
      console.log(err);
    }
    // imgPath = result.map(function(path){
    //    return path.split('\\public')[1].replace(/\\/g,"/")       
    // })
    // var object =parsePathArray(imgPath);
    // console.log(object.img.sprites.lpc)
})

function parsePathArray(paths) {
    var parsed = {};
    for(var i = 0; i < 4; i++) {
        var position = parsed;
        var split = paths[i].split('/');
        for(var j = 0; j < split.length; j++) {
            if(split[j] !== "") {
                if(typeof position[split[j]] === 'undefined')
                    position[split[j]] = {};
                position = position[split[j]];
            }
        }
    }
    return parsed;
}
    


// INITIALIZING SERVER
// -------------------------------------------------------------
var port = process.env.PORT || 8080;

app.engine('handlebars', hdbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app/views/layouts')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'app/views/'));
app.set( 'port', ( process.env.PORT || 8080 ))
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



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// INTIALIZING ROUTERS
// -------------------------------------------------------------
app.use('/', require(path.join(__dirname, '/app/routes/html_controller.js')));

app.use('/users', require(path.join(__dirname, '/app/routes/users_controller.js')));
app.use('/messages', require(path.join(__dirname, '/app/routes/messages_controller.js')));

// INTIALIZING SOCKET.IO
// -------------------------------------------------------------
var server = http.createServer(app);
var io = require('socket.io')(server)
server.listen(port)
// load chat ws
require(path.join(__dirname, './app/ws/chatSIO.js'))(io);

// load main game ws
require(path.join(__dirname, './app/ws/gameSIO.js'))(io);

// load battle ws
require(path.join(__dirname, './app/ws/battleSIO.js'))(io);


// STARTING DB AND SERVER
// -------------------------------------------------------------
// db.sequelize.sync(
//     {force: true}   
// ).then(() => {
//     server.listen(port, () => {
//         console.log('listen to port',port)
//     })
// })
