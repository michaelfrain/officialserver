var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
    passport.use(new BasicStrategy(
	function(username, password, done) {
	    User.findOne({ username: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }
		if (!isValidPassword(user, password)) { return done(null, false); }
		return done(null, user);
	    });
	}
    ));

    var isValidPassword = function(user, password) {
	return bCrypt.compareSync(password, user.password);
    }
}
