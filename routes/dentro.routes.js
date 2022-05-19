const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")


router.get("/", isLoggedIn, (req, res, next)=>{
    const{_id} = req.session.user
    const{name} = req.session.user
    res.render("dentro/dentro.hbs",{
        _id,
        name
    })
})


module.exports = router;