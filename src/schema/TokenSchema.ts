const Schema = require('mongoose').Schema;

export default new Schema({
    setting: {
        name: String,
        symbol: String,
        premint: Number,
        baseUri: String,
        Uri: String,
    }
})