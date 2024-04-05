const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/token_generator_dev');
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect failure, this is the error:", error);
    }
}

module.exports = {
    connect,
};