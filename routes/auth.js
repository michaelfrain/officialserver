var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
	return next();

    res.redirect('/');
}

module.exports = function(passport) {
    router.get('/', function(req, res) {
	res.render('/', { message : req.flash('message') });
    });
    
    router.post('/', passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect: '/register',
	failureFlash : true
    }));

    router.get('/register', function(req, res) {
	res.render('/', { message : req.flash('message') });
    });

    router.post('/register', passport.authenticate('signup', {
	successRedirect: '/',
	failureRedirect: '/',
	failureFlash: true
    }));

    return router;
}
