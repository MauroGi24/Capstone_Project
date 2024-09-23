import express from 'express'
import { deleteRegistration, newRegistration, allRegistrations } from '../controller/registration.controller.js'



const registrationRouter= express.Router()

registrationRouter.get("/", allRegistrations)
// registrationRouter.get("/:id", registration) 
registrationRouter.post("/", newRegistration)
registrationRouter.delete("/:id", deleteRegistration)

export default registrationRouter



