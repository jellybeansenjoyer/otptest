const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:false,
        required:true,        
    },
    date:{
        type:Date,
        unique:false,
        required:true
    },
    address:{
        type:String,
        unique:false,
        required:true
    },
    people:{
        type:Number,
        required:false,
        unique:false,
    },
    active:{
        type:Boolean,
        required:false,
        unique:false
    },
    image:{
        type:String,
        required:false,
        unique:false
    },
    registrations:{
        type:[String],
        required:false,
        unique:false
    }
});

const Event = mongoose.model("event",eventSchema);

module.exports = Event;