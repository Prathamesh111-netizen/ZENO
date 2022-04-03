import mongoose from "mongoose";

const schema = new mongoose.Schema({
     Product: String,
     Details : String,
     Price : Number,
     Stock : { type: Number, default: Date.now},
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('product', schema);

export default model;