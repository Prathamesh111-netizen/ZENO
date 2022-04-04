import mongoose from "mongoose";

const schema = new mongoose.Schema({
     Product : String,
     Manufacturer : String,
     currentOwner : String,
     Status : String, // setup request // accepted request by distributor //  raw material received by retailer
     IsActive : { type : Boolean, default : true},
     Isfulfilled : { type : Boolean, default : false},
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('transportRequest', schema);

export default model;