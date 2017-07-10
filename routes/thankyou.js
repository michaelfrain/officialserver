var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('thankyou', { title : 'Thank you for registering!' });
});

module.exports = router;
