const mongoose = require("mongoose");
const TokenSchema = require('../schema/TokenSchema');

module.exports = new mongoose.model('Token', TokenSchema);