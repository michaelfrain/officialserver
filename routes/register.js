var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    router.get('/', function(req, res, next) {
	res.render('register', { title : 'SCIAC Registration' });
    });

    router.post('/', passport.authenticate('register'), function(req, res) {
	res.redirect('/thankyou');
    });

    return router;
}
