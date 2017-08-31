const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
let session = require('express-session');
const User = models.User;


module.exports = passport.use(new LocalStrategy(
function(username, password, done) {
  console.log(username,password)
  User.findOne({ where: {username: username} }, function (err, user) {
    if (err) { 
      console.log('error!')
      return done(err);
    } 
    if (!user) {
      console.log('incorrect username')
      // return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      console.log('incorrect password')
      // return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('hey')
    return done(null, user);
  });
}

)); 