const express = require('express')
const router = express.Router();

//load the product model
const productModel = require("../model/product");

router.get("/productList",(req,res)=>{

    res.render("productList",{
        title:"Products",
        headingInfo: "Products Page",
        products: productModel.getAllProducts(),

    });
   
});

module.exports = router;