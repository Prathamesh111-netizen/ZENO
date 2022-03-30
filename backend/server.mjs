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



import Web3 from "web3";
import contract from "@truffle/contract";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const artifacts = require("./blockchain/build/contracts/test.json");

// ganache address
if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'))
}
// console.log(web3)

const Test = contract(artifacts)
Test.setProvider(web3.currentProvider)
const accounts = await web3.eth.getAccounts();
const dummy = await Test.deployed();

const a = await dummy.get();
console.log(a)
