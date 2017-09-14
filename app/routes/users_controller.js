// DEPENDENCIES
//----------------------------------------------------------------------------
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const db = require('../models');
const multer  = require('multer');
const path = require('path');
const upload = multer({
    dest: path.join(__dirname,'app/public/img/users/')
    }).single('profile');
const User = db.User;


// CONFIGURE LOCAL STRATEGIES FOR PASSWORD AUTHENTICATION
// --------------------------------------------------------------------------
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.

passport.use(new LocalStrategy(
function(username, password, done) {
     User.findOne({where: {username: username} })
        .then(user => {
            
            if (user === null) {
                console.log('Incorrect username')
               return done(null, false, { message: 'Incorrect username.' });
            }
            
            // console.log(user.get({plain:true}).password)
            return(done(null,user))

            user.comparePassword(password, function (err,isMatch) {
                if (err) { return done(err); }
                if(!isMatch){
                    // console.log('incorrect password')
                    return done(null, false, { message: 'Incorrect password.' });
                } else {
                    console.log('logged in!')
                    return done(null, user);
                }
            });
            
        })
        .catch((err) => {
            if (err) {
                // console.log(err);
                return done(err); 
            }
       });
    }

));

// SESSION PERSISTENCE
// --------------------------------------------------------------------------
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

passport.serializeUser(function(user, done) {
    // console.log('serializing')
    return done(null, user.id);
});

  
passport.deserializeUser(function(id, done) {
    // console.log('deserializing')
    User.findById(id).then( function(user){
        if(!user){
            done(null)
        }else{
            done(null, user);
        }
    });
});
  


// SETTING ROUTERS
// --------------------------------------------------------------------------
// require('connect-ensure-login').ensureLoggedIn('login')
router.get('/', function (req, res, next) {
    console.log('user page',req.user)
    if (req.user) {
        db.User.find({
            where: {id: req.user.id},
            include: [db.Stats, db.Game_State]
        }).then(user => {
            res.render('userPage',{user:user});
        })
   } else {
        res.redirect('/');
   }
});

router.post('/new', (req,res,next) => {

    var userData = JSON.parse(req.body.newUser)
    var newUser = {
        username: userData.username,
        password: User.generateHash(userData.password),
        name: userData.name,
        profile: userData.profile
    }

    var sprite = userData.sprite;
    var weapon = {ItemId: userData.item_inventory};
    var spell = {SpellId: userData.spell_inventory};

    db.User.create(newUser).then((user) => {
        var id = user.get('id');
        sprite.UserId = id;
        weapon.UserId = id;
        spell.UserId = id;

        db.Game_State.create({UserId: id}).then(login => {
            db.Stats.create({UserId: id}).then(stats => {
                db.Sprite.create(sprite).then(sprite =>{
                    db.Inventory.create(weapon).then(weapon =>{
                        db.Spell_Inventory.create(spell).then(spell =>{

                            // var login = {
                            //     username: user.get('username'),
                            //     password: user.get('password')
                            // }

                            res.json(user)
                            // req.login(login, function(err){
                            //     if (err) { return res.status(500).send({error:err}) }
                            //     console.log('hey')
                            //     res.redirect('/user');
                            // })
                        })  
                    })
                })
            })
        })
    })
}); 

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/new'), function(req,res){
    res.render('signup')
}

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err)}
        if (!user) { return res.send(500, {message: 'wrong username or password'})}
        
        req.logIn(user, function(err) {
            // console.log('is auth: ',req.isAuthenticated())
            if (err) { return res.send(500, {message: 'wrong username or password'}) }

            res.json(user)
        });
    })(req, res, next);
});

router.post('/logout', function (req, res) {
    req.logout();
    res.send({message: "Successfully signed out!"})
});

router.post('/profile', function(req,res){
    var imgData = req.body.profile;
    var userId = req.body.userId;

    require("fs").appendFile(path.join(__dirname,"../public/img/users/user-"+userId+".png"), imgData, 'base64', function(err) {
       res.json({success: 'uploaded sprite!'})
    });
})

module.exports = router;

// ,
// onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...')
// },
// limits: {
//     files: 1
// },
// onFileUploadComplete: function (file) {
//     console.log(file.fieldname + ' uploaded to  ' + file.path)
//     imageUploaded=true;
//     console.log(req.files);
//     res.redirect('/user');
// }
// }