const router = require("express").Router();

const UserModel = require("../models/User.model.js")

const bcryptjs= require("bcryptjs")

// GET "auth/signup" => renderizar el formulario de signup
router.get("/signup", (req, res, next)=>{
    res.render("user/user-signup.hbs")
})

//POST "auth/signup" => rebicir los datos del formulario y registrarlo

router.post("/signup", async (req, res, next)=>{
    console.log(req.body)


    const{ name, address, city, phone, days, hours,username, email, password } = req.body

    if(name === "" || address === "" || city === "" || phone === "" || days === "" || hours === "" ||
    username === "" || email === "" || password === "") {
        res.render("user/user-signup", {
            errorMessage: "please, fill all the required fiels"
        })

        return; 
    }

})


router.get("/login", (req, res, next)=>{
    res.render("auth/login.hbs")
})





module.exports = router;