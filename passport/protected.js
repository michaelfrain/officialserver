var DigestStrategy = require('passport-http').DigestStrategy;

module.exports = function(passport) {
    passport.use(new DigestStrategy({ qop: 'auth' },
				    function(username, done) {
					User.findOne({ username: username }, function (err, user) {
					    if (err) { return done(err); }
					    if (!user) { return done(null, false); }
					    return done(null, user, user.password);
					});
				    },
				    function(params, done) {
					// validate nonces as necessary
					done(null, true)
				    })
		);
}
