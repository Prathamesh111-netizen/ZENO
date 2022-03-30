import express from "express";
import db from "../models/index.mjs";

const router = express.Router();

router.get('/dummy', async (req, res)=>{
    
   const data = await db.userModel.find();
   res.send(data);
})

export default router;