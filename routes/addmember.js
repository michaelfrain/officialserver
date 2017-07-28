var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

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
        User.findOne({ 'username' : req.param('username') }, function(err, user) {
             if (err) {
                 console.log('Error in sign up: ' + err);
                 return res.status(400).json({
                     error: 'Request failed.'
                 })
             }

             if (user) {
                 console.log('User already exists with username: ' + user.username);
                 return res.status(400).json({
                    error: 'Username already exists.'
                 })
             }
             var newUser = new User();
             var createHash = function(password) {
                 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
             }

             newUser.username = req.param('username');
             newUser.password = createHash('sciac');
             newUser.email = newUser.username;
             newUser.firstName = req.param('firstName');
             newUser.lastName = req.param('lastName');

             newUser.save(function(err) {
                 if (err) {
                     console.log('Error saving new user: ' + err);
                     throw err;
                 }
                 console.log('User registration successful for username: ' + newUser.username);
                 res.json(newUser);
             });
        });
    });

    return router;
}
