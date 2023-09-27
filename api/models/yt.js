const mongoose = require('mongoose');
const ytSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:false,
        required:true,
    },
    image:{
        type:String,
        unique:false,
        required:false,
    },
    description:{
        type:String,
        unique:false,
        required:false,
    },
    url:{
        type:String,
        unique:false,
        required:true,
    }
});

const yt = mongoose.model("yt",ytSchema);

module.exports = yt;