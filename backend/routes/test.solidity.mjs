import express from "express";
import { web3, dummy } from "../blockchain/blockchain.conn.mjs";
const router = express.Router();

router.get('/inc', (req, res)=>{
  dummy.set({ from:  web3.eth.defaultAccount});
  res.send("incremented")
});

export default router;