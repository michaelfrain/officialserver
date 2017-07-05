var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
	return next();

    res.redirect('/');
}

module.exports = function(passport) {
    router.post('/login', passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect: '/',
	failureFlash : true
    }));

    router.get('/', function(req, res) {
	res.render('index', { message : req.flash('message') });
    });

    return router;
}
