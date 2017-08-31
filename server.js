// DEPENDENCIES
// -------------------------------------------------------------
const express = require('express');
const hdbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');  
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path = require('path');
const WebSocket = require('ws');
const http = require('http');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const db = require('./app/models');

// External Logics
// -------------------------------------------------------------
// require(path.join(__dirname,'./app/login/auth.js'))

// INITIALIZING SERVER
// -------------------------------------------------------------
const app = express();
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

// INTIALIZING WEBSOCKET
// -------------------------------------------------------------
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
};

wss.on('connection',(ws) => {

    ws.on('message', (data) => {
        wss.broadcast(data);
    });


    ws.on('close', function () {
        console.log('stopping client interval');
    });
});


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
    res.render('index')
    console.log(req.session)
    console.log(req.user)
})





