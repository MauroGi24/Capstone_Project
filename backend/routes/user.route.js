import express from 'express'
import {uploadImageProfile} from '../middleware/uploadImage.js'
import authorization from '../middleware/authorization.js'
import { user, newUser, updateUser, deleteUser, allUsers, login, profile } from '../controller/user.controller.js'

const userRouter= express.Router()

userRouter.get("/", allUsers)
userRouter.post("/login", login)
userRouter.get("/profile", authorization, profile)
userRouter.get("/:id", user) 
userRouter.post("/", uploadImageProfile.single('avatar'), newUser)
userRouter.put("/:id", uploadImageProfile.single('avatar'), updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter