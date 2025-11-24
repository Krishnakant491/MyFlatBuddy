import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    images:[{
        type:String,
        required:true,
    }
    ],
    address:{
        type: String,
        required: true,
    },
    landmark:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    postCode:{
        type: String,
        required: true,
    },
    vacancy:{
        type: String,
        required: true,
    },
    bhk:{
        type:String,
        required:true
    },
    rent:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    possessionBy:{
        type: String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default: true
    }
    ,
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
    }]
},{timestamps:true})

const PostModel= mongoose.model("Post", postSchema)

export default PostModel;