import connectDB from "./connection.mjs";
import userModel from "./user.model.mjs"
import userTransactionsModel from "./user.transaction.model.mjs";
import productModel from "./product.model.mjs";
import productTransactionModel from "./product.transaction.model.mjs";

const db = {};
db.connectDB = connectDB;
db.user = userModel;
db.userTransaction = userTransactionsModel;
db.product = productModel;
db.productTransaction = productTransactionModel;

export default db;