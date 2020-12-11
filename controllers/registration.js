const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require('../model/user');
router.get("/registration",(req,res)=>{

    res.render("registration",{
        title:"registration",
        headingInfo: "registration"

    });

});




router.get("/dashboard", (req, res) => {
    res.render("dashboard", {user: req.session.userInfo, layout: false});
  });


router.post("/registration", (req, res) => {
    const regEx = /^[a-zA-Z0-9]+$/;
    const emailRegexp = /\S+@\S+\.\S+/;
    const error = []; 

    const newUser = new User ({
    firstName: req.body.firstName,
	lastName: req.body.lastName,
	email: req.body.email,
	password: req.body.password,
	confirmPassword: req.body.confirmPassword
    });

    //Saving a new user 
    newUser.save((err) => {
        if(err) {
         
          console.log(err);
        } else {
          
          console.log(newUser);
        }
      });

      

       
       User.findOne({email: newUser.email})
       .then(newUser => {
           if (newUser) {
               errors.push("Email already exist");
               res.render("users/registration", {
                   messages: error
               });
           }
       })
       .catch(err=>console.log(`Error: ${err}`));

   if (emailRegexp.test(newUser.email) == false) {
       error.push("Please enter a valid email");
   }


    if (req.body.firstName == "") {
        error.push("First Name is missing!")
    };
    
    if (req.body.lastName == "") {
        error.push("Last Name is missing!")
    };

    if (req.body.email == "" || !emailRegexp.test(req.body.email)) {
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

// Route to user login
router.get("/login", (req, res) => {
    res.redirect("/");
});


// User login form 
router.post("/user-login", (req, res) => {
    const errors = [];

    const formData = {
        email: req.body.email,
        password: req.body.passWord
    }

    if (formData.email.trim() == '') {
        errors.push("Please enter a email");
    }

    if (formData.password.trim() == '') {
        errors.push("Please enter a password");
    }

    
    if (errors.length > 0) {
        res.render("login", {
            messages: errors
        });
    }

    else {
        User.findOne({ email: formData.email })
        .then(newUser => {

            
            if (newUser == null) {
                
                errors.push("Sorry, you entered the wrong username and/or password");
                res.render("login", {
                    messages: errors
                });
            }

        else {
            bcrypt.compare(formData.password, newUser.password)
                .then(isMatched => {

                    // Password is good
                    if (isMatched == true) {
                        req.session.userInfo = newUser;
                        console.log(req.session.userInfo.firstName);
                        console.log("Password match");
                         res.redirect("dashboard");
                        } 
                    
                   // Password is bad
                   else {
                    errors.push("Sorry, you entered the wrong username and/or password");
                    res.render("login", {
                        messages: errors
                    });
                }
            })
            .catch(err => console.log(`Error: ${err}`));


        }
      });

     }  
        
});


module.exports = router;






        /*
            res.render("dashboard",{
                title:"/",
                headingInfo: "/"
            });
            */
      //  }