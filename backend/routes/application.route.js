import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { applyPost, getAppliedPosts, getApplicants } from "../controllers/application.controller.js"

const applicationRouter= express.Router()

applicationRouter.route("/apply/:id").get(isAuth,applyPost)
applicationRouter.route("/getapplied").get(isAuth, getAppliedPosts)
applicationRouter.route("/:id/applicants").get(isAuth, getApplicants)

export default applicationRouter