const adminAccess = (req,res,next) => {
    if (req.session != null) {
        if (req.session.userData == "Admin") {
            next();
        }else {
            res.redirect("/user/login");
        }
    } else {
        res.redirect("/user/login");
    }
}

module.exports = adminAccess;