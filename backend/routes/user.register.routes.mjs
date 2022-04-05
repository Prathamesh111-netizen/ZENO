import express from "express";
import db from "../models/index.mjs";

import {
        web3,
        factory,
} from "../blockchain/blockchain.conn.mjs"

const router = express.Router();

// Create a new instance of smart contract , for each type of user

// Creating a new Manfacturer
router.post('/create-manufacturer', async (req, res)=>{
    const user = {};
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    user.Role = "Manufacturer";
    user.IsActive = true;
    
    await factory.createManufacturer({ from:  process.env.defaultAccount});
    const index = await factory.get_manufacturer_SIZE({from : process.env.defaultAccount});
    
    const all_manufacturer = await factory.allManufacturers({from : process.env.defaultAccount});
    const contractAddress = all_manufacturer[parseInt(index) - 1];
    
    const Accounts = await factory.getEthAccount();
    const E_index = await factory.getIndex();
    await factory.incrementIndex({from : process.env.defaultAccount});
    
    user.ContractAddress = contractAddress;
    user.eth_Account = Accounts[E_index];

    // final operation
    db.user.create(user);
    res.send(user);

})

// Creatinfg a new Distributor
router.post('/create-distributor', async (req, res)=>{
    const user = {};
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    user.Role = "Distributor";
    user.IsActive = true;
    
    await factory.createDistributor({ from:  process.env.defaultAccount});
    const index = await factory.get_distributor_SIZE();
    
    const all_distributor = await factory.allDistributors();
    const contractAddress = all_distributor[parseInt(index) - 1];
    
    const Accounts = await factory.getEthAccount();
    const E_index = await factory.getIndex();
    await factory.incrementIndex({from : process.env.defaultAccount});
    
    user.ContractAddress = contractAddress;
    user.eth_Account = Accounts[E_index];

    // final operation
    db.user.create(user);
    res.send(user);
})

router.post('/create-retailer', async (req, res)=>{
    const user = {};
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    user.Role = "Retailer";
    user.IsActive = true;
    
    await factory.createRetailer({ from:  process.env.defaultAccount});
    const index = await factory.get_retailer_SIZE();
    
    const all_retailer = await factory.allRetailers();
    const contractAddress = all_retailer[parseInt(index) - 1];
    
    const Accounts = await factory.getEthAccount();
    const E_index = await factory.getIndex();
    await factory.incrementIndex({from : process.env.defaultAccount});
    
    user.ContractAddress = contractAddress;
    user.eth_Account = Accounts[E_index];

    // final operation
    db.user.create(user);
    res.send(user);
})

router.post('/create-customer', async (req, res)=>{
    const user = {};
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    user.Role = "Customer";
    user.IsActive = true;
    
    await factory.createCustomer({ from:  process.env.defaultAccount});
    const index = await factory.get_customer_SIZE();
    
    const all_customer = await factory.allCustomers();
    const contractAddress = all_customer[parseInt(index) - 1];
    
    const Accounts = await factory.getEthAccount();
    const E_index = await factory.getIndex();
    await factory.incrementIndex({from : process.env.defaultAccount});
    
    user.ContractAddress = contractAddress;
    user.eth_Account = Accounts[E_index];

    // final operation
    db.user.create(user);
    res.send(user);
})

router.get('/login', async (req, res)=>{
    const User = {};
    User.Email = req.body.Email;
    User.Password = req.body.Password;
    User.IsActive = true;

    db.user.findOne(User).then(result=>{

        // console.log(result);
    
        if (result == null)
            return res.send({Success : false});
        else{
            res.cookie('accessToken', result);
            return res.send({Success : true})
        }
    });
})


export default router;