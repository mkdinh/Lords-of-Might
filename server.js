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
// const WebSocket = require('ws');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const db = require('./app/models');

// External Logics
// -------------------------------------------------------------
// require(path.join(__dirname,'./app/login/auth.js'))

// INITIALIZING SERVER
// -------------------------------------------------------------
const port = process.env.PORT || 3000;

app.engine('handlebars', hdbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname ,'app/views/layouts')
}));

app.set('view engine','handlebars');
app.set('views', path.join(__dirname,'app/views/'));    
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
app.use(express.static(path.join(__dirname,'/app/public/')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// INTIALIZING ROUTERS
// -------------------------------------------------------------
app.use('/users', require(path.join(__dirname,'./app/routes/users.js')));
app.use('/messages', require(path.join(__dirname,'./app/routes/messages.js')));
// INTIALIZING SOCKET.IO
// -------------------------------------------------------------
const http = require('http');;
const server = http.createServer(app);
const io = require('socket.io')(server)

// load chat
require(path.join(__dirname,'./app/ws/chat.js'))(io);


// STARTING DB AND SERVER
// -------------------------------------------------------------

db.sequelize.sync(
    // {force: true}   
).then(() => {
    server.listen(port, () => {
        console.log('listen to port',port)
    })
})

app.get('/', (req,res) => {
    var isLoggedIn = !!req.user;

    res.render('index',{loggedIn: isLoggedIn})

    if(req.user){
        console.log(req.user.username)
    }
})





