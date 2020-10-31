const express = require('express')
const router = express.Router();

//Route for the Home Page
router.get("/",(req,res)=>{

    console.log(process.env.SEND_GRIP_API_KEY)
    res.render("home",{
        title:"Home",
        headingInfo: "Home Page"

    });

});

router.get("/login",(req,res)=>{

    res.render("login",{
        title:"Login",
        headingInfo: "login",

    });
   
});


module.exports = router;