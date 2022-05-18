const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")


router.get("/", isLoggedIn, (req, res, next)=>{

    const{name} = req.session.user
    res.render("dentro/dentro.hbs",{
        name
    })
})


module.exports = router;