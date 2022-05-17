const router = require("express").Router();

//const {redirect} = require("express/lib/response")

const UserModel = require("../models/User.model.js")

const bcryptjs= require("bcryptjs")

// GET "user/signup" => renderizar el formulario de signup
router.get("/signup", (req, res, next)=>{
    res.render("user/user-signup.hbs")
})

//POST "user/signup" => rebicir los datos del formulario y registrarlo

router.post("/signup", async (req, res, next)=>{

    console.log(req.body)


    const{ name, address, city, phone, days, hours, email, password } = req.body

    if(name === "" || address === "" || city === "" || phone === "" || days === "" || hours === ""  || email === "" || password === "") {
        res.render("user/user-signup", {
            errorMessage: "please, fill all the required fiels"
        })

        return; 
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(passwordRegex.test(password) === false){
        res.render("user/user-signup.hbs", {
            errorMessage:"contraseña no válida, necesita ocho caracteres, una letra y un numero"
        })
        return;


    }


    try{

        const loginUser = await UserModel.findOne({email})
        console.log(loginUser)

        if(loginUser){
            res.render("user/user-signup", {
                errorMessage: "the user already exist"
            })
            return;
        }


        const salt = await bcryptjs.genSalt(11)

        const hashPassword = await bcryptjs.hash(password, salt)

        console.log(hashPassword)

        const newUser = await UserModel.create({
            name,
            address,
            city,
            phone,
            days,
            hours,
            email,
            password: hashPassword

        })

        res.redirect("/user/login")

    }catch(err){
        next (err)
    }

})


router.get("/login", (req, res, next)=>{
    res.render("user/user-login.hbs")
})

//POST "user/login"=> recibir las credenciales del usuario y validarlo.
router.post("/login", async (req, res, next)=>{

    console.log(req.body)

    const {email, password} = req.body

    if(!email || !password ){
        res.render("user/user-login", {
            errorMessage: "debes rellenar todos los campos"
        })
        return; 
    }

    try{
        const loginUser = await UserModel.findOne({ email: email})

        if(!loginUser){
            res.render("user/user-login", {
                errorMessage: "Lo siento el usuario no esta registrado"
            })
            return; 
        }

        const passwordCheck = await bcryptjs.compare(password, loginUser.password)
        if(!passwordCheck){
            res.render("user/user-login", {
                errorMessage: "contraseña invalida"
            })
            return; 
    
        }

        // para el sistema de autenticacion, crea la sesion activa del usuario
        //me dice quien es el usuario logueado, siempre tengo acceso en todas las rutas.
        req.session.user = loginUser;
        console.log(loginUser); 

         //req.app.locals.userIsActive = true;
        // console.log()

        res.redirect("/dentro")

    }catch(err){
        next(err)
    }

})





module.exports = router;