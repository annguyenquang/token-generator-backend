const mongoose = require("mongoose");
const SettingSchema = require("../schema/SettingERC20");


// const SettingModel = new Schema({
//     name: String,
//     symbol: String,
//     premint: { type: Number, default: 0 },
// })

module.exports = new mongoose.model("Setting", SettingSchema);





