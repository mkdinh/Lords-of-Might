// DEPENDENCIES
//----------------------------------------------------------------------------
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const db = require('../models');
const multer  = require('multer');
const upload = multer();
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

            // user.comparePassword(password, function (err,isMatch) {
            //     if (err) { return done(err); }
            //     if(!isMatch){
            //         // console.log('incorrect password')
            //         return done(null, false, { message: 'Incorrect password.' });
            //     } else {
            //         console.log('logged in!')
            //         return done(null, user);
            //     }
            // });
            
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

router.get('/', require('connect-ensure-login').ensureLoggedIn('login'), function (req, res, next) {
    if (req.user) {
        res.render('index');
   } else {
        res.redirect('/');
   }
});

router.post('/new', upload.single('profile'), (req,res) => {
    var newUser = {
        username: req.body.user.username,
        password: User.generateHash(req.body.user.password),
        name: req.body.user.name,
        profile: req.body.user.profile
    }

    var sprite = {
        body: req.body.sprite.body,
        head: req.body.sprite.head,
        torso: req.body.sprite.torso,
        leg: req.body.sprite.leg,
        weapon: req.body.sprite.spell.weapon
    };

    User.create(newUser, {
        include: [
            {model: db.Sprite},
            {model: db.Game_State},
            {model: db.Inventory},
    ]}).then((user) => {
        res.redirect('/user');
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


module.exports = router;