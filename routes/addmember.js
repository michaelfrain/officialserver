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
        res.render('addmember', { message: req.flash('message') });
    });
    
    router.post('/', isAuthenticated, function(req, res, next) {
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
    });

    return router;
}
