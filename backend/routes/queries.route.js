import express from "express"
import adminAuth from "../middlewares/adminAuth.js"
import { createQuery, getAllQueries, getQueryById } from "../controllers/queries.controller"

const queryRouter= express.Router()

queryRouter.route("/query").post(adminAuth,createQuery)
queryRouter.route("/getqueries").get(adminAuth,getAllQueries)
queryRouter.route("/query/:id").get(adminAuth,getQueryById)

export default queryRouter