const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")


router.get("/", isLoggedIn, (req, res, next)=>{


    res.render("dentro/dentro.hbs")
})


module.exports = router;