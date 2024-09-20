import express from 'express'
import {uploadImageProfile} from '../middleware/uploadImage.js'
import { users, user, newUser, updateUser, deleteUser, changeAvatar } from '../controller/user.controller.js'



const userRouter= express.Router()

userRouter.get("/", users)
userRouter.get("/:id", user) 
userRouter.post("/", uploadImageProfile.single('avatar'), newUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.patch("/:id/avatar", uploadImageProfile.single('avatar'), changeAvatar)

export default userRouter