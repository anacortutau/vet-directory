const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");


const petSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    owner: {

        type: String,
        required: true
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
        required: true
    },

    triage: {
        type: String,
        required: true


    },

    diagnostic: {
        type: String,
        required: true
    },


    treatement: {

        type: String,
        required: true

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    
})


const PetModel = mongoose.model("pet", petSchema);

module.exports = PetModel;