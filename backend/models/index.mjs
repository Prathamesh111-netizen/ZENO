import connectDB from "./connection.mjs";
import userModel from "./user.model.mjs"
import productModel from "./product.model.mjs";
import rawMaterialModel from "./raw.material.mjs";
import productRequestModel from "./product.request.model.mjs";
import transportRequestModel from "./transport.request.model.mjs";

const db = {};
db.connectDB = connectDB;
db.user = userModel;
db.product = productModel;
db.rawMaterial = rawMaterialModel;
db.productRequest = productRequestModel;
db.transportRequest = transportRequestModel;

export default db;