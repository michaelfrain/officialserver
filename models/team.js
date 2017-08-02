var mongoose = require('mongoose');

module.exports = mongoose.model('Team', {
    id: String,
    name: String,
    lat: Number,
    lon: Number,
    stadiumName: String
});