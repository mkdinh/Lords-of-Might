// DEPENDENCIES
// -------------------------------------------------------------
var express = require('express');
var hdbs = require('express-handlebars');
var bodyParser = require('body-parser');
var db = require('./app/models');
var methodOverride = require('method-override')
var path = require('path');

// INITIALIZING SERVER
// -------------------------------------------------------------
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', hdbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname,'app/views/layouts')
}));

app.set('view engine','handlebars');

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'app/views/'));
app.use(express.static(path.join(__dirname,'/app/public/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// INTIALIZING ROUTERS
// -------------------------------------------------------------

// STARTING DB AND SERVER
// -------------------------------------------------------------

db.sequelize.sync(
    {force: true}
).then(() => {
    app.listen(port, () => {
        console.log('listen to port',port)
    })
})

app.get('/', (req,res) => {
    res.render('index');
})


