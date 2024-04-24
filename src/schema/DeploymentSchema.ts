import { Schema } from "mongoose";

export default new Schema({
    owner: String,
    deployment: [{
        name: String,
        address: String,
        deployHash: String,
        blockNumber: Number,
        abi: String,
        byteCode: String,
    }]
});