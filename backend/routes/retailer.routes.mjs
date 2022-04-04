// create a product
// place a diff request for each raw material and pay ether 

import express from "express";
import db from "../models/index.mjs"
import { web3,
        retailer_ABI,
        product_ABI,
        factory
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



// Request for Raw Materials
router.post('/', async (req, res)=>{

    const user = req.cookies.accessToken;

    // created a new contract for product
    await factory.createProduct({from : process.env.defaultAccount});

    const index = await factory.get_product_SIZE();
    const allProducts = await factory.allProducts();

    const ContractAddress = allProducts[index - 1];

    const contractInstance = await new web3.eth.Contract(product_ABI, ContractAddress);
    // var currentStage = await contractInstance.methods.getProductStage().call();
    // console.log(currentStage)
    await contractInstance.methods.incrementStage();
    const currentStage = await contractInstance.methods.getProductStage().call();
    // console.log(currentStage);


    await db.productTransaction.create({
        Product: req.body.Product,
        Stage : currentStage,
        From : user.ContractAddress,
        to : ContractAddress,
    });

    await db.product.findOne({Product : req.body.Product}).then(result=>{
        console.log(result)
        // await db.activeRequest.create({
        //     Retailer : String,
        //     Product: String,
        //     Material : String,
        //     Capacity : Number,
        //     IsActive : Boolean,
        // })
    })

    res.send({Success : true})


});

export default router;
