// this is how we connect to blockchain
import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

// ganache address to web3
if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider(process.env.ganache_server))
}

//setting accounts : default account => 0
const accounts = await web3.eth.getAccounts();
web3.eth.defaultAccount = accounts[0];

// setup to import json files
import contract from "@truffle/contract";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// import smart contracts .json
const test_artifacts = require("./build/contracts/test.json");
const manufacturer_artifacts = require("./build/contracts/Manufacturer.json");
const contracts_factory_artifacts = require("./build/contracts/Contracts_Factory.json");

// Test Contract
const Test = contract(test_artifacts)
Test.setProvider(web3.currentProvider)
const dummy = await Test.deployed();

// Manufacturer Contract
const _manufacturer_artifacts = contract(manufacturer_artifacts);
_manufacturer_artifacts.setProvider(web3.currentProvider)
const manufacturer = await _manufacturer_artifacts.deployed();
const manufacturer_ABI = manufacturer_artifacts.abi;

// Contracts_Factory Contract
const _factory_artifacts = contract(contracts_factory_artifacts);
_factory_artifacts.setProvider(web3.currentProvider)
const factory = await _factory_artifacts.deployed();


export {
    web3,
    dummy,
    manufacturer_artifacts, _manufacturer_artifacts, manufacturer, manufacturer_ABI,
    factory
};

