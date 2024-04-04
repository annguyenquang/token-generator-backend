const Schema = require('mongoose').Schema;

module.exports = new Schema({
    setting: {
        name: String,
        symbol: String,
        premint: Number,
        baseUri: String,
        Uri: String,
    }
})