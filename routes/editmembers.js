var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(passport) {
    var isAuthenticated = function(req, res, next) {
        if (req.user)
            return next();
        else
            return res.status(401).json({
                error: 'User not authenticated.'
            })
    }
    
    router.get('/', isAuthenticated, function(req, res) {
        res.render('editmembers', { message: req.flash('message')});
    });
    
    router.get('/json', isAuthenticated, function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });
    
    return router;
}