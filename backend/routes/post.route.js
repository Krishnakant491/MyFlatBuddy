import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { CreatePost, getAllPost, getPostById, updatePost } from "../controllers/post.controller.js"
import { singleUpload } from "../middlewares/multer.js"



const Postrouter= express.Router()

Postrouter.route('/post').post(isAuth, singleUpload, CreatePost)
Postrouter.route('/getallposts').get(getAllPost)
Postrouter.route('/getpostbyid/:id').get(isAuth,getPostById)
Postrouter.route('/update/:id').post(isAuth,singleUpload,updatePost)

export default Postrouter
