var login = require('./login');
var register = require('./register');
var User = require('../models/user');
var protect = require('./protected');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
	console.log('Serializing user ' + user);
	done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
	    console.log('Deserializing user ' + user);
	    done(err, user);
	});
    });

    login(passport);
    register(passport);
    protect(passport);
}
