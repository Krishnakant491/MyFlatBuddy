import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    resettoken:{
        type: String,
        default:'',
    }
},{timestamps:true})

const userModel= mongoose.model("User", userSchema)

export default userModel