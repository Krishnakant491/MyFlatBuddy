// Function to create a post

import PostModel from "../models/post.model.js"
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const CreatePost = async (req, res) => {
  try {
      
      const { address, landmark, state, city, postCode, vacancy, bhk, rent, gender, possessionBy } = req.body;
      const userId = req.id;


      const file= req.file;
      const fileUri= getDataUri(file)
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      if (!address || !landmark || !state || !city || !postCode || !vacancy || !bhk ||  !rent || !gender || !possessionBy) {
          return res.status(400).json({
              message: 'Something is missing',
              success: false
          });
      }


      const post = await PostModel.create({
          address,
          landmark,
          state,
          city,
          postCode,
          vacancy,
          bhk:Number(bhk),
          rent: Number(rent),
          gender,
          possessionBy,
          images: cloudResponse.secure_url, // Save URLs to database
          created_by: userId
      });

      return res.status(200).json({
          message: 'New Post created successfully',
          post,
          success: true
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: error.message,
          success: false
      });
  }
};

export const getAllPost= async(req,res)=>{
    try {
      
      // console.log('Started')
      const keyword = req.query.keyword || "";
      const query = {
          $or:[
              {address:{$regex:keyword, $options:"i"}},
              {landmark:{$regex:keyword, $options:"i"}},
              {state:{$regex:keyword, $options:"i"}},
              {city:{$regex:keyword, $options:"i"}},
              {postCode:{$regex:keyword, $options:"i"}}

          ]
      }
        const posts= await PostModel.find(query).populate({
            path:'created_by',
        })

        if(!posts){
            return res.status(400).json({
                message:'No post found',
                success: false
            })
        }
        
        return res.status(200).json({
            message:'Post found successfully',
            posts,
            success:true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'Somthing went wrong',
            success: false
        })
    }
}


export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id; // Post ID to be updated
    // console.log(postId)
    const userId = req.headers['id']; // User ID from middleware
    const { address, landmark, state, city, postCode, vacancy, bhk, rent, gender, possessionBy } = req.body;
    const file = req.file;

    // Find the post to ensure it exists and belongs to the user
    const post = await PostModel.findOne({ _id: postId, created_by: userId });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you do not have permission to update it",
        success: false,
      });
    }

    // Handle file upload if a new file is provided
    let imageUrl = post.images;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      imageUrl = cloudResponse.secure_url; // Update with new image URL
    }

    // Update the post with the new data
    post.address = address || post.address;
    post.landmark = landmark || post.landmark;
    post.state = state || post.state;
    post.city = city || post.city;
    post.postCode = postCode || post.postCode;
    post.vacancy = vacancy || post.vacancy;
    post.bhk = bhk ? Number(bhk) : post.bhk;
    post.rent = rent ? Number(rent) : post.rent;
    post.gender = gender || post.gender;
    post.possessionBy = possessionBy || post.possessionBy;
    post.images = imageUrl;

    // Save updated post
    await post.save();

    return res.status(200).json({
      message: "Post updated successfully",
      post,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getPostById = async (req, res) => {
    try {
      // console.log('Started')
      const userId = req.params.id; // Ensure req.id is populated from middleware
      // console.log(userId)
      if (!userId) {
        return res.status(401).json({
          message: 'User not found',
          success: false,
        });
      }
  
      const posts = await PostModel.find({ _id: userId }).populate({
        path:"applications"
      })
  
      if (!posts || posts.length === 0) {
        return res.status(200).json({
          message: 'No posts found',
          success: true,
        });
      }
  
      return res.status(200).json({
        message: 'Posts found successfully',
        posts,
        success: true,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Something went wrong',
        success: false,
      });
    }
  };

  