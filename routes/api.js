var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Game = require('../models/game');
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
    
    var isAdmin = function(req, res, next) {
        if (req.user.role == 1)
            return next();
        else
            return res.status(401).json({
                error: 'User must be admin to perform this function.'
            })
    }
    
    router.get('/editmembers', isAdmin, function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });
    
    router.post('/addmember', isAdmin, function(req, res, next) {
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
             newUser.role = req.param('role');

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
    
    router.post('/addgame', isAdmin, function(req, res, next) {
        var newGame = new Game();
        
        newGame.date = req.param('date');
        newGame.home = req.param('home');
        newGame.visitor = req.param('visitor');
        newGame.hScore = 0;
        newGame.vScore = 0;
        newGame.overtime = false;
        newGame.totalTime = 0;
        newGame.television = false;
        newGame.conference = 'SCIAC';
        newGame.officials = req.param['officials'];
        
        newGame.save(function(err) {
            if (err) {
                console.log('Error saving new game: ' + err);
                throw err;
            }
            console.log('New game created for: ' + newGame.date);
            res.json(newGame);
        })
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash : true
    }));
    
    router.post('/register', passport.authenticate('register'), function(req, res) {
        res.redirect('/thankyou');
    });
    
    return router;
}