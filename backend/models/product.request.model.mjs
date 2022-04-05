import mongoose from "mongoose";

const schema = new mongoose.Schema({
     Product : String,
     Retailer : String,
     Material : String,
     Capacity : Number,
     Price : Number,
     currentOwner : String,
     Status : String, // setup request // accepted request by manufacturer // raw material with distributor // raw material received
     IsActive : { type : Boolean, default : true},
     Isfulfilled : { type : Boolean, default : false},
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('productRequest', schema);

export default model;