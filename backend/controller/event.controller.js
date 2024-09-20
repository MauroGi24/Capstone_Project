import Event from '../models/eventSchema.js'
import User from '../models/userSchema.js'
import transport from '../services/mail.service.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import 'dotenv/config'
 

export const allEvents = async (request, response) =>{
    const page = request.query.page
    const perPage = request.query.perPage
    const events = await Event.find({}).sort({name: 1, surname: 1}).skip((page - 1) * perPage).limit(perPage)
    response.send(events)
}

export const event = async (request, response) =>{
    const id = request.params.id
    try {
        const event = await Event.findById(id)
        response.send(event)
    }
    catch(error) {
        response.status(404).send({message: `L'evento non esiste o è stato cancellato`, error: error.message})
    }
}

export const newEvent = async (request, response) => {
    try {
        const eventPath = request.file ? request.file.path : 'https://fakeimg.pl/400x400/ffffff/?text=Cover%20Evento';
        const event = new Event({ ...request.body, cover: eventPath });
        const createdEvent = await event.save();
        const users = await User.find({});
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailNewEvent.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8'); 
        users.forEach(async (user) => {
            try {
                let emailHtml = htmlTemplate.replace('{{name}}', user.name)
                .replace('{{eventTitle}}', event.name)
                .replace('{{eventDate}}', event.date)
                .replace('{{eventLocation}}', event.place)
                .replace('{{eventDescription}}', event.description)
                .replace('{{eventUrl}}', `${process.env.HOST}${process.env.PORT}/events/${event._id}`)
                .replace('{{unsubscribeUrl}}', `${process.env.HOST}${process.env.PORT}/users/${user._id}`);
                await transport.sendMail({
                    from: 'noreply@eventflow.com',
                    to: user.email, 
                    subject: "Nuovo Evento su EventFlow", 
                    text: `Ciao ${user.name}, è stato creato un nuovo evento su EventFlow!`, 
                    html: emailHtml
                });
            } catch (emailError) {
                console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
            }
        });
        response.status(201).send(createdEvent);
    } catch (error) {
        response.status(400).send({ message: 'Ricontrolla i dati', error: error.message });
    }
};


export const updateEvent = async (request, response) => {
    const id = request.params.id
    const modifiedEvent = request.body
    try {
        const newEvent = await Event.findByIdAndUpdate(id, { $set: modifiedEvent, new: true });
        response.status(200).send(newEvent);
    } catch (error) {
        response.status(400).send({ message: `Errore nella modifica dell'utente`, error: error.message });
    }
}

export const changeCover = async (request, response) => {
    const id = request.params.id
    try {
        const newCover = await Event.findByIdAndUpdate(id, {cover: request.file.path}, {new:true})
        response.status(200).send(newCover)
    } catch (error) {
        response.status(400).send({message: `Impossibile modificare l'immagine`, error: error.message})
    }
}

export const deleteEvent = async (request, response) => {
    const id = request.params.id
    try{
        const removeEvent = await Event.findByIdAndDelete(id)
        response.send(removeEvent)
    }
    catch(error) {
        response.status(400).send({message: `Impossibile rimuovere l'utente`, error: error.message})
    }
}

