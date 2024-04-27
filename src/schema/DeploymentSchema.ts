import { Schema } from "mongoose";

export default new Schema({
    owner: String,
    deployment: [{
        network: {
            chainId: Number,
            name: String,
        },
        name: String,
        address: String,
        deployHash: String,
        blockNumber: Number,
        abi: [],
        byteCode: String,
    }]
});