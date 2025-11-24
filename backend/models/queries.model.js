import mongoose from "mongoose";

const queriesSchema= new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Queries= mongoose.model('Queries', queriesSchema)

export default Queries