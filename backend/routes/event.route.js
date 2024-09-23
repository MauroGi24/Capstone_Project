import express from 'express'
import {uploadImageEvent} from '../middleware/uploadImage.js'
import { allEvents, changeCover, deleteEvent, event, newEvent, updateEvent } from '../controller/event.controller.js'



const eventRouter= express.Router()

eventRouter.get("/", allEvents)
eventRouter.get("/:id", event) 
eventRouter.post("/", uploadImageEvent.single('cover'), newEvent)
eventRouter.put("/:id", updateEvent)
eventRouter.delete("/:id", deleteEvent)
eventRouter.patch("/:id/cover", uploadImageEvent.single('cover'), changeCover)

export default eventRouter