var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
	   return next();

    res.redirect('/');
}

module.exports = function(passport) {
    router.get('/', function(req, res) {
        res.render('login', { message : req.flash('message') });
    });
    
    return router;
}
