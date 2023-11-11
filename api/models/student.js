const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:false,
        required:true,
    },
    email:{
        type:String,
        required:false,
        unique:false
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    course:{
        type:String,
        required:false,
        unique:false
    }, 
    specialization:{
        type:String,
        required:false,
        unique:false
    },
    collegeName:{
        type:String,
        required:false,
        unique:false
    },
    year:{
        type:String,
        required:false,
        unique:false
    },
    projects:{
        type:String,
        required:false,
        unique:false
    },
    bio:{
        type:String,
        required:false,
        unique:false
    },
    linkedIn:{
        type:String,
        required:false,
        unique:false
    },
    github:{
        type:String,
        required:false,
        unique:false
    },
    insta:{
        type:String,
        required:false,
        unique:false
    },
    others:{
        type:String,
        required:false,
        unique:false
    },
    verified:{
        type:Boolean,
        required:false,
        unique:false
    }
});

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;