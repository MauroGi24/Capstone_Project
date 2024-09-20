import express from 'express'
import {uploadImageProfile} from '../middleware/uploadImage.js'
import { user, newUser, updateUser, deleteUser, changeAvatar, allUsers } from '../controller/user.controller.js'



const userRouter= express.Router()

userRouter.get("/", allUsers)
userRouter.get("/:id", user) 
userRouter.post("/", uploadImageProfile.single('avatar'), newUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.patch("/:id/avatar", uploadImageProfile.single('avatar'), changeAvatar)

export default userRouter