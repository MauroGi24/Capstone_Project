import express from 'express'
import { deleteRegistration, newRegistration, allRegistrations, updateRegistration, userRegistrations } from '../controller/registration.controller.js'

const registrationRouter= express.Router()

registrationRouter.get("/", allRegistrations)
registrationRouter.get("/user/:id", userRegistrations)
registrationRouter.post("/", newRegistration)
registrationRouter.delete("/:id", deleteRegistration)
registrationRouter.put("/:id", updateRegistration)

export default registrationRouter



