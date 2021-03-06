var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        findOrCreateUser = function() {
             User.findOne({ 'username' : username }, function(err, user) {
             if (err) {
                 console.log('Error in sign up: ' + err);
                 return done(err);
             }

             if (user) {
                 console.log('User already exists with username: ' + username);
                 return done(null, false, req.flash('message', 'User already exists.'));
             }
             var newUser = new User();

             newUser.username = username;
             newUser.password = createHash(password);
             newUser.email = username;
             newUser.firstName = req.param('firstName');
             newUser.lastName = req.param('lastName');

             newUser.save(function(err) {
                 if (err) {
                 console.log('Error saving new user: ' + err);
                 throw err;
                 }
                 console.log('User registration successful for username: ' + username);
                 return done(null, newUser);
             });
             });
         };

         process.nextTick(findOrCreateUser);
    }));

    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}
