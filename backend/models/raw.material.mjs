import mongoose from "mongoose";

const schema = new mongoose.Schema({
     Manufacturer : String,
     Product: String,
     Price : Number,
     Capacity : Number,
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('rawmaterial', schema);

export default model;