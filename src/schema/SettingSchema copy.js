const Schema = require("mongoose").Schema;

module.exports = new Schema({
    name: String,
    symbol: String,
    premint: { type: Number, default: 0 },
})