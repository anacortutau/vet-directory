const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");


const petSchema = new Schema({

    name: {
        type: String,
        
    },

    owner: {

        type: String,
       
    },

    category: {

        type: String,
        enum:["dog", "cat", "exotic", "farm"]
    }, 

    age: {

        type: Number 
    },

    weigth: {
        type: Number,
       
    },

    triage: {
        type: String,
       


    },

    diagnostic: {
        type: String,
        
    },


    treatement: {

        type: String,
        

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    
})


const PetModel = mongoose.model("pet", petSchema);

module.exports = PetModel;