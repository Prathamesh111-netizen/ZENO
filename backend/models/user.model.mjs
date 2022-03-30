import mongoose from "mongoose";

const Schema = mongoose.Schema;

// defining schema model
const user = new Schema({
  Email: String,
  Password: String
});

// Compile model from schema
const userModel = mongoose.model('user', user );

export default userModel;