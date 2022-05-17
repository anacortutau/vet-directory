const  router  =  require ( "express" ).Router( );

const PetModel = require("../models/Pet.model.js")

const UserModel = require("../models/User.model.js")


// GET =>  "/pet/create" renderizar hacia el formulario de crear un animal

router.get("/create", (req, res, next)=>{
    console.log("probando esta ruta get")
    res.render("pet/new-pet.hbs")
})

//POST: => "/pet/create" volcar la info del  formulario para crear un animal

router.post("/create", (req, res, next)=>{

    console.log("probando esta create post")
    const { name, category, owner, age, weigth, triage, diagnostic, treatement} = req.body
    if(name === "" || owner === "" || age === "" || weigth === "" || triage === ""  || diagnostic === "" || treatement === "") {
        res.render("pet/new-pet", {
            errorMessage: "please, fill all the required fiels"
        })
        return; 
    }

    if(!req.body.category === "dog" || !req.body.category === "cat" || !req.body.category === "exotic" || !req.body.category === "farm"){
        res.render("pet/new-pet", {
            errorMessage: "please, choose a category"
        })

        return;
    }



    //El servidor ya sabe quien esta haciendo esta solicitud, siempre que este logueado.
    //Cual es esta variable, que dice quien es el usuario.
    const{_id} = req.session.user 

    PetModel.create({
        name,
        category,
        owner,
        age,
        weigth,
        triage,
        diagnostic,
        treatement,
        user: _id
    })
    .then (()=>{
      res.redirect("/pet/list")
    })

    .catch((err)=>{
        next(err)
    })

})

router.get("/search", (req, res, next)=>{
    console.log("probando esta ruta get del search")
    res.render("pet/pet-search")
})

router.post("/search", (req, res, next)=>{
    console.log("probando esta ruta post del search")
    const{name} = req.body
    const{_id} = req.session.user
    if(name === "") {
        res.render("pet/pet-search", {
            errorMessage: "please, enter a name to search"
        })
        console.log(errorMessage);
        return; 
    }

 
        PetModel.find({name})
     
       .then((listPet)=>{
        console.log(listPet)
        
            listPet.forEach((eachPet)=>{
             
                if(eachPet.user == _id){
                   console.log("funciona") 
                    // res.render("pet/pet-list-filter",{
                        
                    // })
                }
    
               })

       
               
        
    })

    .catch((err)=>{
        next(err)
    })
    
})

router.get("/list-filter", (req, res, next)=>{
    console.log("probando esta ruta get")
    res.render("pet/pet-list-filter.hbs")
})


router.get("/list",(req, res, next)=>{
    console.log("probando esta ruta get del list")
    const{_id} = req.session.user 
    PetModel.find({user:_id})
    .then((listPet)=>{
        res.render("pet/pet-list",{
            listPet 
        })

    })
    .catch((err)=>{
        next(err)
    })
})

//GET => "/pet/:id" Seleccionar por id para consultar los datos del paciente

router.get("/:id", (req, res,next)=>{
    console.log("probando la ruta")
    const {id} = req.params

    PetModel.findById(id)
    .then((pet)=>{
        res.render("pet/pet-details",{
            pet
        })
    })
    .catch((err)=>{
        next(err)
    })
})

// GET=>  "/pet/:id/edit" para renderizar el formulario para editar información del paciente
router.get("/:id/edit", async (req, res, next)=>{
    const {id} = req.params;

    try{

        const pet = await PetModel.findById(id)

        res.render("pet/pet-edit.hbs", {
            pet
        })
    }catch(err){
        next(err)
    }
})

// POST => "/pet/:id/edit" actualizar la informacion a partir del formulario en la bbdd
router.post("/:id/edit", (req, res, next)=>{

    const{age, weigth, triage, diagnostic, treatement} = req.body
    const{id} = req.params

    PetModel.findByIdAndUpdate(id, {
        age,
        weigth,
        triage,
        diagnostic,
        treatement
    })
    .then((pet)=>{

        res.redirect("/dentro")
    })
    .catch((err)=>{
        next(err)
    })
})
// POST => "/pet/:id/delete" borrar pacientes

router.post("/:id/delete", async (req, res, next)=>{

    const{id} = req.params

    try{

        await PetModel.findByIdAndRemove(id)

        res.redirect("/dentro")
    }catch(err){
        next(err)
    }
})

//GET => "/pet/search" Buscar los animales que tiene el usuario



//POST => "/pet/search" Buscar los animales que tiene el usuario










module.exports  =  router ;