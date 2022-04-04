import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }))

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Parse cookies bodies 
app.use(cookieParser());

app.use(express.json({
  type: ['application/json', 'text/plain']
}))


// Port and Server setup
const PORT = process.env.PORT || 1200;
app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`Server Running at http://localhost:${PORT}/`);
});

// database connection
import db from "./models/index.mjs"
db.connectDB();

// blockchain connection
import { dummy } from "./blockchain/blockchain.conn.mjs"
const blockchain_conn = await dummy.get();
console.log(blockchain_conn);

// Routes
// import { eth_manufacturer } from "./routes/index.mjs"
// app.use('/eth-blockchain',  eth_manufacturer);

// import { solidity_testing } from "./routes/index.mjs"
// app.use('/test', solidity_testing);

// final routes
import {
  authentication,
  RegisterRouter,
  eth_manufacturer,
  eth_retailer
   }
   from "./routes/index.mjs";
   
// separate auth for each category later

app.use('/register', RegisterRouter);
app.use('/manufacturer', authentication, eth_manufacturer);
app.use('/retailer', authentication, eth_retailer);

