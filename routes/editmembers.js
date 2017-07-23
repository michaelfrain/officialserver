var express = require('express');
var router = express.Router();

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
        res.render('editmembers', { message: req.flash('message') });
    });
    
    return router;
}