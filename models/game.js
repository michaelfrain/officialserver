var mongoose = require('mongoose');
var TeamModel = require('./team');
var UserModel = require('./user');
var Team = mongoose.model('Team').schema;
var User = mongoose.model('User').schema;

module.exports = mongoose.model('Game', {
    id: String,
    date: Date,
    home: Team,
    visitor: Team,
    hScore: Number,
    vScore: Number,
    overtime: Boolean,
    nOvertimes: { type: Number, default: 0 },
    totalTime: Number,
    television: Boolean,
    conference: String,
    officials: [User]
});