import express from "express";
import {
    web3,
    manufacturer_ABI
} from "../blockchain/blockchain.conn.mjs";

import db from "../models/index.mjs";

const router = express.Router();

router.post('/produce-material', async (req, res) => {

    const user = req.cookies.accessToken;
    console.log(user)
    const contractInstance = await new web3.eth.Contract(manufacturer_ABI, user.ContractAddress);

    // const contractAddress;
    const _material = req.body.Material;
    const _capacity = req.body.Capacity;
    const _price = req.body.Price;


    // update on blockchain
    await contractInstance.methods.produce(_material, _capacity).send({ from: process.env.defaultAccount });

    // update on database
    // await db.rawMaterial.findOne({ Manufacturer: user._id, Product: _material }).then(async (result) => {
       
        // if (result == null) {
           await db.rawMaterial.create({
                Manufacturer: user._id,
                Product: _material,
                Price: _price,
                Capacity: parseInt(_capacity)
            });
        // }
    //     else {
    //          await db.rawMaterial.updateOne(result, {$set : {
    //              Capacity: parseInt(result.Capacity) + parseInt(_capacity),
    //              Price: parseInt(result.Price) + parseInt(_price)
    //         }});
    //     }
    // });

    res.send({ Success: true });

});

router.get('/sell-material', (req, res)=>{
    // sell it to retailer

})

export default router;