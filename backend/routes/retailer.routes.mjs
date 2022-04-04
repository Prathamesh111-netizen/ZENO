// create a product
// place a diff request for each raw material and pay ether 

import express from "express";
import db from "../models/index.mjs"
import { web3,
        retailer_ABI
 } from "../blockchain/blockchain.conn.mjs"; 

const router = express.Router();

router.post('/create-product', async(req, res)=>{

    const user = req.cookies.accessToken;
    const contractInstance = await new web3.eth.Contract(retailer_ABI, user.ContractAddress);

    const product = {};
    product.Retailer = user.ContractAddress;
    product.Product = req.body.Product;
    product.Price = req.body.Price;

    product.Requirement = [];
    product.Requirement.push({_material :req.body.material_1, _capacity : req.body.capacity_1 });
    await contractInstance.methods.createProduct(req.body.Product, req.body.material_1, req.body.capacity_1).send({from : process.env.defaultAccount});

    if (req.body.material_2 != ""){
        product.Requirement.push({_material :req.body.material_2, _capacity : req.body.capacity_2 });
        await contractInstance.methods.createProduct(req.body.Product, req.body.material_2, req.body.capacity_2).send({from : process.env.defaultAccount});
    }
    if (req.body.material_3 != ""){
        product.Requirement.push({_material :req.body.material_3, _capacity : req.body.capacity_3 });
        await contractInstance.methods.createProduct(req.body.Product, req.body.material_3, req.body.capacity_3).send({from : process.env.defaultAccount});
    }

    // update on database
    await db.product.create(product);

    //update on blockchain
    

    res.send({Success : true});
});

export default router;
