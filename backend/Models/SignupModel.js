const mongoose = require("mongoose");


const SignupTemplete = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,

    },
    imagepath:{
        type:String,
        required:true,

    },
    rtime:{
        type:Date,
        default:Date.now,
    }
});


module.exports=mongoose.model("mytable", SignupTemplete);