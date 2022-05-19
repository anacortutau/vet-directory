const router = require("express").Router();


const UserModel = require("../models/User.model.js")

const bcryptjs= require("bcryptjs");
const req = require("express/lib/request");



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

         req.app.locals.userIsActive = true;
        // console.log()

        res.redirect("/dentro")

    }catch(err){
        next(err)
    }

})

router.get("/search", (req, res, next)=>{
    console.log("probando esta ruta get del search")
    res.render("user/user-list")
})



router.post("/search", (req, res, next)=>{
    console.log("probando esta ruta post del search")
    const{city} = req.body
    if(city === "") {
        res.render("index", {
            errorMessage: "please, enter a city to search"
        })
        console.log(errorMessage);
        return; 
    }
        UserModel.find({city: city})
       .then((listUser)=>{
        console.log(listUser)
        res.render("user/user-list",{
          listUser 
        })
    })
  
    .catch((err)=>{
        next(err)
    })
    
  })





  router.get("/:id", (req, res,next)=>{
    console.log("probando la ruta")
    const {id} = req.params

    UserModel.findById(id)
    .then((user)=>{
        res.render("user/user-details",{
            user
        })
    })
    .catch((err)=>{
        next(err)
    })
})



// GET=>  "/user/:id/edit" para renderizar el formulario para editar información del usuario
router.get("/:id/edit", async (req, res, next)=>{
    const{_id} = req.session.user
    
    
    try{
        const user = await UserModel.findById(_id)
        res.render("user/user-edit.hbs", {
            user
        })
    }catch(err){
        next(err)
    }
})

// POST => "/user/:id/edit" actualizar la informacion a partir del formulario en la bbdd
router.post("/:id/edit", (req, res, next)=>{

    const{address, city, phone, days, hours, email} = req.body
    const{_id} = req.session.user

    if(address === "" || city === "" || phone === "" || days === "" || hours === ""|| email === "") {

        res.render("user/user-edit", {
            errorMessage: "please, fill all the required fiels"
        })
        return; 
    }

    UserModel.findByIdAndUpdate(_id,{
        address,
        city,
        phone,
        days,
        hours,
        email,
       

    })
    .then((user)=>{
        res.redirect("/dentro")
    })
    .catch((err)=>{
        next(err)
    })
})



  router.post("/logout", (req, res, next) =>{
    req.session.destroy()

    req.app.locals.userIsActive = false;

        res.redirect("/")
    
})





module.exports = router;