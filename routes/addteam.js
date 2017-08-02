var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    var isAuthenticated = function(req, res, next) {
        if (req.user)
            return next();
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
    
    router.get('/', isAdmin, function(req, res) {
        res.render('addteam', { message: req.flash('message' ) }); 
    });
    
    return router;
}