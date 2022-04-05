import mongoose from "mongoose";

const schema = new mongoose.Schema({
     Owner : String,
     Material: String,
     Price : Number,
     Capacity : Number,
     IsActive : {type : Boolean, default : true},
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('rawmaterial', schema);

export default model;