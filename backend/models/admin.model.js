import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default: true
    },
    resettoken:{
        type: String,
        default:'',
    }

},{timeStamps:true})

const adminModel= mongoose.model("Admin",adminSchema)
export default adminModel