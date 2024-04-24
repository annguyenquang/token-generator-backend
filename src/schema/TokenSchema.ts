import { Schema } from 'mongoose'

export default new Schema({
    setting: {
        name: String,
        symbol: String,
        premint: Number,
        baseUri: String,
        Uri: String,
    }
})