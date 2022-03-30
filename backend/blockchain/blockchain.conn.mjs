// this is how we connect to blockchain
import Web3 from "web3";

// ganache address to web3
if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'))
}

//setting accounts
const accounts = await web3.eth.getAccounts();
web3.eth.defaultAccount = accounts[0];

// setup to import json files
import contract from "@truffle/contract";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// import smart contracts .json
const test_artifacts = require("./build/contracts/test.json");

const Test = contract(test_artifacts)
Test.setProvider(web3.currentProvider)
const dummy = await Test.deployed();

export {
    web3,
    dummy
};

