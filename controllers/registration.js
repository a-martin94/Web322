const express = require('express')
const router = express.Router();

router.get("/registration",(req,res)=>{

    res.render("registration",{
        title:"registration",
        headingInfo: "registration"

    });

});

router.post("/registration", (req, res) => {
    const regEx = /^[a-zA-Z0-9]+$/;
    const regExEamil = /\S+@\S+\.\S+/;
    const error = []; 

    if (req.body.firstName == "") {
        error.push("First Name is missing!")
    };
    
    if (req.body.lastName == "") {
        error.push("Last Name is missing!")
    };

    if (req.body.email == "" || !regExEamil.test(req.body.email)) {
        error.push("email is missing")
    };

    if (req.body.passWord == "" || !regEx.test(req.body.passWord)) {
        error.push("Password is missing or does not match format")
    };

    if (req.body.confirmPassword == "") {
        error.push("ConfirmPassword is missing")
    };

    if (error.length > 0) {

        res.render
        ("registration",{
            title:"registration",
            headingInfo: "registration",
            error: error          
        });
    }

    else {

       const {firstName, lastName, email} = req.body;
       console.log(req.body);
     
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRIP_API_KEY);
        const msg = {
        to: `andrewmartin380@gmail.com`,
        from: `${email}`,
        subject: 'Regestration info',
        html: 
        `Welcome ${firstName} ${lastName} <br>
         Your login Email ${email} <br>
         This is your login info! <br>
        `
    };
        sgMail.send(msg)
        .then(() => {
            res.redirect("/login");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        })
    
       
    }
      
});

module.exports = router;