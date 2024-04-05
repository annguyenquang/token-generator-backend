const mongoose = require("mongoose");
const TokenSchema = require('../schema/TokenSchema');

export default new mongoose.model('Token', TokenSchema);