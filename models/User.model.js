
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({

name: {
    type: String,
    required: true


},
address: {

    type: String

},

city: {
    type: String,
    required: true
},

phone: {

    type: Number

}, 

days: {
    type: String
},

hours: {
    type: String
},


email: {
    type: String,
    unique: true,
    required: true

},

password: {
  type: String,
  required: true

},

},
{
  timestamp: true
}

);



const UserModel = model("user", userSchema);

module.exports = UserModel;
