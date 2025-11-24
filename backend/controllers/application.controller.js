import { Application } from "../models/application.model.js"
import PostModel from "../models/post.model.js";


export const applyPost = async (req, res) => {
    try {
        const userId = req.headers['id'];
    
        const postId = req.params.id;
        // console.log(postId);
        
        if (!postId) {
            return res.status(400).json({
                message: 'Post is required',
                success: false
            });
        }

        const checkExistingApplication = await Application.findOne({ post: postId, applicant: userId });



        if (checkExistingApplication) {
            return res.status(200).json({
                message: 'Already applied',
                success: true
            });
        }

        // Use the Post model to find the post by its ID
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ // Use 404 for 'not found'
                message: 'Post not found',
                success: false
            });
        }

        const newApplication = await Application.create({
            post: postId,
            applicant: userId
        });

        post.applications.push(newApplication._id);
        await post.save();

        res.status(200).json({
            message: 'Applied successfully',
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            success: false
        });
    }
}


export const getApplicants= async (req,res)=>{

    try {
            const postId= req.params.id

    const post= await PostModel.findById(postId).populate({
        path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
    })

    if(!post){
        return res.status(400).json({
            message:'Post not found',
            success:false
        })
    }

    return res.status(200).json({
        post,
        success:true
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error,
            success:false
        })
    }
}

export const getAppliedPosts = async (req, res)=>{
    try {
                const userId= req.id;
                const application = await Application.find({applicant:userId}).sort({createAt:-1}).populate({
                    path:'post',
                    options:{sort:{createdAt: -1}},
                });
                if(!application){
                    return res.status(404).json({
                        message:"No Application found",
                        success:false,
                    })
                }
                return res.status(200).json({
                    application,
                    success:true,
                })
    } catch (error) {
        console.log(error)
    }
}