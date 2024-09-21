import express from 'express'
import { deleteRegistration, newRegistration } from '../controller/registration.controller.js'



const registrationRouter= express.Router()

// registrationRouter.get("/", allEvents)
// registrationRouter.get("/:id", event) 
registrationRouter.post("/", newRegistration)
registrationRouter.delete("/:id", deleteRegistration)

export default registrationRouter