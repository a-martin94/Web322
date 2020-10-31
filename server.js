//express handle bars
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

require('dotenv').config({path: "./config/keys.env"});

const bodyParser = require('body-parser');

const genralController = require("./controllers/general");

const productsController = require("./controllers/products");

const registrationController = require("./controllers/registration");

//parse app urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars middle ware, this tells express to set HB as template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static('public'));


app.use("/",genralController);
app.use("/",productsController);
app.use("/",registrationController);


const PORT = 5001;
app.listen(PORT,()=>{
    console.log('web server running');
});

//const PORT = 3000;

//routes
/*
app.get("/",(req, res)=>{
res.render("general/home");
});

//contact route
app.get("/registration",(req, res)=>{
    res.render("general/registration");
});

//user submmit 
app.post("/registration",(req, res)=>{
    //res.render();
    });

//product route list
app.get("/product/list",(req, res)=>{
    res.render("product/productList");
    });

//product add fourm
app.get("/product/add",(req, res)=>{
    res.render("product/productAdd");
    });

//user submit fourm
app.post("/product/add",(req, res)=>{
     res.render();
     });

*/
//const PORT = 3000;
