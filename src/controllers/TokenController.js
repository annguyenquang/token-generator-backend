const mongoose = require('mongoose');
const TokenModel = require('../models/TokenModel');
const TokenSchema = require('../schema/TokenSchema');

class TokenController {
    getAllToken = async (req, res, next) => {
        console.log("Đã vào index");
        const data = await TokenModel.find();
        res.json(data);
    }

    saveToken = async (req, res, next) => {
        let token = new TokenModel({
            setting: {
                name: "Ant",
            }
        })
        res.json(await token.save());
    }
}

module.exports = new TokenController;