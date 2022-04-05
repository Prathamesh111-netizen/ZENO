import mongoose from "mongoose";

const schema = new mongoose.Schema({
     Retailer : String,
     Product: String,
     Price : Number,
     Requirement : [{_material : String, _capacity : Number, _price : Number }],
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('product', schema);

export default model;