// create a product
// place a diff request for each raw material and pay ether 

import express from "express";
import db from "../models/index.mjs"
import {
    web3,
    retailer_ABI,
    product_ABI,
    distributor_ABI,
    factory,
    transport_ABI
} from "../blockchain/blockchain.conn.mjs";

const router = express.Router();

router.post('/create-product', async (req, res) => {

    // no need to update the Product Contract with material data, as it is wastage of gas
    // .createProduct() not required

    const user = req.cookies.accessToken;
    // const contractInstance = await new web3.eth.Contract(retailer_ABI, user.ContractAddress);

    const product = {};
    product.Retailer = user.ContractAddress;
    product.Product = req.body.Product;
    product.Price = req.body.Price;

    // update on blockchain
    product.Requirement = [];
    product.Requirement.push({ _material: req.body.material_1, _capacity: req.body.capacity_1, _price: req.body.price_1 });
    // await contractInstance.methods.createProduct(req.body.Product, req.body.material_1, req.body.capacity_1, req.body.price_1).send({ from: process.env.defaultAccount });

    if (req.body.material_2 != "") {
        product.Requirement.push({ _material: req.body.material_2, _capacity: req.body.capacity_2, _price: req.body.price_2 });
        // await contractInstance.methods.createProduct(req.body.Product, req.body.material_2, req.body.capacity_2, req.body.price_2).send({ from: process.env.defaultAccount });
    }
    if (req.body.material_3 != "") {
        product.Requirement.push({ _material: req.body.material_3, _capacity: req.body.capacity_3, _price: req.body.price_3 });
        // await contractInstance.methods.createProduct(req.body.Product, req.body.material_3, req.body.capacity_3, req.body.price_3).send({ from: process.env.defaultAccount });
    }

    // update on database
    await db.product.create(product);

    res.send({ Success: true });
});



// set Request for Raw Materials
router.post('/setup-raw-material-request', async (req, res) => {

    // html form only contains Product name here

    const user = req.cookies.accessToken; // accessing cookie

    // created a new contract for product
    await factory.createProduct(user.ContractAddress, { from: process.env.defaultAccount });
    const index = await factory.get_product_SIZE();
    const allProducts = await factory.allProducts();
    const ContractAddress = allProducts[index - 1];
    const productContract = await new web3.eth.Contract(product_ABI, ContractAddress); // product

    // access the product details from database and create a request for each one
    db.product.findOne({ Product: req.body.Product }).then(async (result) => {

        console.log(result)
        // setup request // accepted request by manufacturer // raw material with distributor // raw material received

        if (result) {

            result.Requirement.forEach(async (element) => {
                await db.productRequest.create({
                    Product: ContractAddress,
                    Retailer: user.ContractAddress,
                    Material: element._material,
                    Capacity: element._capacity,
                    Price: element._price,
                    currentOwner: user.ContractAddress,
                    Status: "Request setup",
                })
                // console.log(user.ContractAddress)
                // console.log(user.eth_A)
                // console.log(ContractAddress)
                await web3.eth.sendTransaction({ from: user.eth_Account, to: ContractAddress, value: element._price });

                await productContract.methods.setRequests(element._material).send({ from: process.env.defaultAccount });

            });

            res.send({ Success: true })
        }
        else
            return res.send({ Success: false })
    })

});


router.post('/confirm-fulfillment-of-request', async (req, res) => {


    // to contract needs to fulfill at the same, html form will have 2 fields : product and transport address

    // accessing the cookie
    const user = req.cookies.accessToken;


    await db.transportRequest.findOne({ _id: req.body.TransportID, IsActive: true }).then(async (result) => {

        if (result == null)
            return res.send({ Success: false });
        else {
            // update the Product contract
            const productContract = await new web3.eth.Contract(product_ABI, result.Product);
            await productContract.methods.fulfillRequest(result.Material).send({ from: process.env.defaultAccount });

            // update the Transport Contract
            const transportContract = await new web3.eth.Contract(transport_ABI, result.Transport);
            await transportContract.methods.fulfillRequest(result.Material).send({ from: process.env.defaultAccount });

            // update productrequest collection in database
            await db.productRequest.updateOne({ Product: result.Product }, {
                $set: {
                    currentOwner: user.ContractAddress,
                    Status: "Raw material received by retailer",
                    IsActive: false,
                    Isfulfilled: true
                }
            });

            // update transportRequest collection in database
            await db.transportRequest.updateOne({ Transport: result.Transport }, {
                $set: {
                    currentOwner: user.ContractAddress,
                    Status: "Raw material received by retailer",
                    IsActive: false,
                    Isfulfilled: true
                }
            });

            // update the retailer stock in rawmaterials
            // update on database
            await db.rawMaterial.findOne({ Material: result.Material, Owner: user.ContractAddress }).then(async (docs) => {

                if (docs == null) {
                    await db.rawMaterial.create({
                        Owner: user.ContractAddress,
                        Material: result.Material,
                        Capacity : result.Capacity
                    });
                }
                else {
                    await db.rawMaterial.updateOne(docs, {
                        $set: {
                            Capacity: parseInt(docs.Capacity) + parseInt(result.Capacity),
                            Price: parseInt(docs.Price) + parseInt(result.Price)
                        }
                    });
                }
            });

            return res.send({ Success: true });
        }
    })



});

// create a product on shelf for customers to buy


export default router;
