//express handle bars
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

require('dotenv').config({path: "./config/keys.env"});

const bodyParser = require('body-parser');

const mongoose = require("mongoose");

const clientSessions = require("client-sessions");

const genralController = require("./controllers/general");

const productsController = require("./controllers/products");

const registrationController = require("./controllers/registration");

//parse app urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars middle ware, this tells express to set HB as template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static('public'));


// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: process.env.cookiePassword, // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
  }));


 
app.use((req, res, next)=>{
res.locals.userData =req.session.userData;
next();
})


app.use("/",genralController);
app.use("/",productsController);
app.use("/",registrationController);



//DATABASE CONNECTION START 
var dbUserName = process.env.dbUserName;
var dbPassword = process.env.dbPassword;
var dbName = process.env.dbName;

mongoose.connect(`mongodb+srv://zeusUser:${dbPassword}@seneca.chdfu.mongodb.net/${dbName}?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
    console.log(`Connected to database`);
})
.catch((err) => {
    console.log(`Error connecting to database: ${err}`);
});
//DATABASE CONNECTION END



//const PORT= 5001;
const PORT= process.env.PORT;
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
