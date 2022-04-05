import express from "express"

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

// first - entry into the website
router.get('/', (req, res)=>res.render("index"));
router.get('/enter', (req, res)=>res.render("index_2options"));
router.get('/signup', (req, res)=>res.render("index_4options"));

export default router 