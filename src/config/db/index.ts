import { on } from "events";

const mongoose = require("mongoose");

const localDB = "mongodb://localhost:27017/token_generator_dev";
const onlDB = "mongodb+srv://ann:81akrQoSZpDlHMvQ@cluster0.5oepi4w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connect = async () => {
    try {
        await mongoose.connect(onlDB, {

        });
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect failure, this is the error:", error);
    }
}

module.exports = {
    connect,
};