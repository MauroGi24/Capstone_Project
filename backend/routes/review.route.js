import express from 'express'
import {newReview, review, updateReview, deleteReview} from '../controller/review.controller.js'



const reviewRouter= express.Router()

// reviewRouter.get("/", allReviews)
reviewRouter.get("/:id/", review) 
reviewRouter.post("/:eventId", newReview)
reviewRouter.put("/:id", updateReview)
reviewRouter.delete("/:id", deleteReview)

export default reviewRouter