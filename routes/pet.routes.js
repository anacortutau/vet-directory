const  router  =  require ( "express" ).Router( );

const PetModel = require("../models/Pet.model.js")

// GET =>  "/pet/create" renderizar hacia el formulario de crear un animal

router.get("/create", (req, res, next)=>{
    res.render("pet/new-pet.hbs")
})

//POST: => "/pet/create" volcar la info del  formulario para crear un animal

router.post("/create", (req, res, next)=>{
    const { name, category, owner, age, weigth, triage, diagnostic, treatement} = req.body
    //El servidor ya sabe quien esta haciendo esta solicitud, siempre que este logueado.
    //Cual es esta variable, que dice quien es el usuario.
    PetModel.create({
        name,
        category,
        owner,
        age,
        weigth,
        triage,
        diagnostic,
        treatement
    })
    .then ((listPet)=>{
        res.redirect("/pet")
        
    })

    .catch((err)=>{
        next(err)

    })

})

//GET => "/pet/search" Buscar los animales que tiene el usuario

//POST => "/pet/search" Buscar los animales que tiene el usuario

//GET => "/pet/:id" Seleccionar por id para consultar los datos del paciente

// GET=>  "/pet/:id/edit" para renderizar el formulario para editar información del paciente

// POST => "/pet/:id/edit" actualizar la informacion a partir del formulario en la bbdd

// POST => "/pet/:id/delete" borrar pacientes










module.exports  =  router ;