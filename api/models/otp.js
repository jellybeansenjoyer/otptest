const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    number:{
        type:String,
        unique:true,
        required:true,
    }, 
    code:{
        type:String,
        unique:false,
        required:false
    },
    ttl:{
        type:String,
        unique:false,
        required:false
    }
});

const Otp = mongoose.model("otp",otpSchema);

module.exports = Otp;