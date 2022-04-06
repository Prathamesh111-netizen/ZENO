import express from "express"
import db from "../models/index.mjs";

const router = express.Router()

// view pages for login and signup activities

router.get('/login-page', (req, res)=>{
    const data = {
        title : "Login",
        FormName : "Login",
        buttonName : "Login",
        api : "/register/login",
        method : "GET"
      }

    res.render("Login_Signup", {Data : data});
});

router.get('/signup-manufacturer', (req, res)=>{
    const data = {
        title : "Manufacturer Signup",
        FormName : "Manufacturer Signup",
        buttonName : "Create Account",
        api : "/register/create-manufacturer",
        method : "POST"
      }
      
    res.render("Login_Signup", {Data : data});
});

router.get('/signup-distributor', (req, res)=>{
    const data = {
        title : "Distributor Signup",
        FormName : "Distributor Signup",
        buttonName : "Create Account",
        api : "/register/create-distributor",
        method : "POST"
      }
      
    res.render("Login_Signup", {Data : data});
});

router.get('/signup-retailer', (req, res)=>{
    const data = {
        title : "Retailer Signup",
        FormName : "Retailer Signup",
        buttonName : "Create Account",
        api : "/register/create-retailer",
        method : "POST"
      }
      
    res.render("Login_Signup", {Data : data});
});

router.get('/signup-customer', (req, res)=>{
    const data = {
        title : "Customer Signup",
        FormName : "Customer Signup",
        buttonName : "Create Account",
        api : "/register/create-customer",
        method : "POST"
      }
      
    res.render("Login_Signup", {Data : data});
});

router.get('/manufacturer-Page', async (req, res) =>{

  const data = {
    Alert : "",
    Profile : req.cookies.accessToken
  };
 
  await db.productRequest.find({IsActive : true , Isfulfilled : false, IsAcceptedbyManufacturer : false}).then (async (result)=>{
    data.Requests = result;
    console.log(result);
    await db.rawMaterial.find({Owner : req.cookies.accessToken.ContractAddress}).then (async (docs)=>{
      console.log(docs);
      data.Stock = docs;
      res.render('MainPage_manu', {Data : data});
    })
  });

});
router.get('/retailer-Page', async (req, res) =>{

  const data = {
    Alert : "",
    Profile : req.cookies.accessToken
  };

  await db.transportRequest.find({retailer :req.cookies.accessToken.ContractAddress,  IsActive : true , IsAccepted : false, IsAcceptedbyDistributor: true}).then (async (result)=>{
    data.Requests = result;
    // console.log(data);
    await db.product.find({Owner : req.cookies.accessToken.ContractAddress}).then (async (docs)=>{
      console.log(docs);
      data.Stock = docs;
      await db.productRequest.find({Owner : req.cookies.accessToken.ContractAddress, IsActive : true}).then (async (ress)=>{
        data.wRequests = ress;
        res.render('MainPage_retail', {Data : data});
      })
    })
  });

});

router.get('/distributor-Page', async (req, res) =>{

  const data = {
    Alert : "",
    Profile : req.cookies.accessToken
  };

  await db.transportRequest.find({IsAcceptedbyDistributor : false,  IsActive : true , IsAccepted : false}).then (async (result)=>{
    data.Requests = result;
    res.render('MainPage_distr', {Data : data});
  });

});




// first - entry into the website
router.get('/enter', (req, res)=>res.render("index_2options"));
router.get('/signup', (req, res)=>res.render("index_4options"));
router.get('/', (req, res)=>res.render("index"));

export default router 