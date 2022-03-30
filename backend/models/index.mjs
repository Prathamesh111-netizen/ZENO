import connectDB from "./connection.mjs";
import userModel from "./user.model.mjs"

const db = {};
db.connectDB = connectDB;
db.userModel = userModel;

export default db;