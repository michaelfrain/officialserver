var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    router.get('/', passport.authenticate('digest', { session: false }),
	       function(req, res) {
		   res.render('home', { message: req.flash('message') });
	       });

    return router;
}
