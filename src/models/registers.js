const mongoose = require("mongoose");
const bookingsSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email :{
        type:String,
        required : true,
        unique : true
    },
   password :{
        type:String,
        required : true,
    },
    repeatpassword :{
        type:String,
        required : true,
    }


})
//now we need to create a collections
const Register = new mongoose.model("Register",bookingsSchema);
module.exports = Register;