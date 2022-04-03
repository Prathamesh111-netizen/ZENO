import mongoose from "mongoose";

const schema = new mongoose.Schema({
     ProductId: String,
     From : String,
     to : {type : String, default : 'self'}, 
     Amount : {type : String, default : '0'}, 
     Details : String,
     Price : Number,
     timestamp: { type: Date, default: Date.now}
});

const model = mongoose.model('productTransaction', schema);

export default model;