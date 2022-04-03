import express from "express";
import { web3, manufacturer } from "../blockchain/blockchain.conn.mjs";
const router = express.Router();


router.get('/available-material', async (req, res)=>{
    
   
    const available_material = await manufacturer.available();
    res.send({available_material : parseInt(available_material, 16)});
});

router.post('/produce-material', async (req, res)=>{
    
    let _amount = req.body.Amount;
    await manufacturer.produce(parseInt(_amount), { from:  web3.eth.defaultAccount});
    
    const available_material = await manufacturer.available();
    res.send(available_material);
    
});

router.get('/sell-material', async (req, res)=>{
    
    let _amount = req.body.Amount;
    await manufacturer.produce(parseInt(_amount), { from:  web3.eth.defaultAccount});

    const available_material = await manufacturer.available();
    res.send(available_material);

});

export default router;