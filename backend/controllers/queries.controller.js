
import adminModel from "../models/admin.model.js"
import { Queries } from "../models/queries.model.js"


export const createQuery= async (req,res)=>{    
    try {
        const {email, name, query}= req.body
        const data = await Queries.create({
            email,
            name,
            query
        }).res.status(200).json({
            message:"Query uploaded successfully",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message:"Error: Something went wrong",
            success: false
        })
    }
}

export const getAllQueries= async(req,res)=>{

    try {
        const userId= req.id
        const isAdmin= await adminModel.find({_id:userId})
        if (!isAdmin){
            return res.status(404).json({
                message:"This link can only be accessed by Admin",
                success:false
            })
        }    
        const queries= await Queries.find()
        return res.status(200).json({
            message:"Queries found",
            queries,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message:"Error: something went wrong",
            success:false
        })
    }
}

export const getQueryById= async(req,res)=>{
    try {
        const queryId = req.params.id
        const adminId= req.id
        const isAdmin= await adminModel.find({userId})
        if (!isAdmin){
            return res.status(404).json({
                message:"This link can only be accessed by Admin",
                success:false
            })
        }    
        const query= await Queries.findOne({_id:queryId})
        return res.status(200).json({
            message:"Query found",
            query,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Error: something went wrong",
            success: false
        })
    }
}
