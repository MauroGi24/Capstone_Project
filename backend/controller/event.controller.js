import Event from '../models/eventSchema.js'
import User from '../models/userSchema.js'
import Registration from '../models/registrationSchema.js'
import transport from '../services/mail.service.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
 

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
        for (const user of users) {
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
                    html: emailHtml
                });
            } catch (emailError) {
                console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
            }
        };
        response.status(201).send(createdEvent);
    } catch (error) {
        response.status(400).send({ message: 'Ricontrolla i dati', error: error.message });
    }
};

export const updateEvent = async (request, response) => {
    const id = request.params.id;
    const modifiedEvent = request.body;

    try {
        // Se c'è un file (immagine della cover), aggiorna il campo cover con il percorso dell'immagine
        if (request.file && request.file.path) {
            modifiedEvent.cover = request.file.path; // Path restituito da Cloudinary
        }
        const newEvent = await Event.findByIdAndUpdate(id, { $set: modifiedEvent }, { new: true });       
        if (!newEvent) {
            return response.status(404).send({ message: 'Evento non trovato per l\'aggiornamento.' });
        }
        const registrations = await Registration.find({ eventId: id });
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailUpdateEvent.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        for (const registration of registrations) {
            const user = await User.findById(registration.userId);
            if (user) {
                try {
                    let emailHtml = htmlTemplate
                        .replace('{{name}}', user.name)
                        .replace('{{eventTitle}}', newEvent.name)
                        .replace('{{eventDate}}', newEvent.date)
                        .replace('{{eventLocation}}', newEvent.place)
                        .replace('{{eventDescription}}', newEvent.description)
                        .replace('{{eventUrl}}', `${process.env.HOST}${process.env.PORT}/events/`)
                        .replace('{{unsubscribeUrl}}', `${process.env.HOST}${process.env.PORT}/api/v1/users/${user._id}`);
                    await transport.sendMail({
                        from: 'noreply@eventflow.com',
                        to: user.email,
                        subject: `L'evento ${event.name} è stato aggiornato`,
                        html: emailHtml
                    });
                } catch (emailError) {
                    console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
                }
            }
        }
        response.status(200).send(newEvent);
    } catch (error) {
        response.status(400).send({ message: `Errore nella modifica dell'evento`, error: error.message });
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
    const id = request.params.id;
    
    try {
        const event = await Event.findById(id);
        const registrations = await Registration.find({ eventId: id });
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailDeleteEvent.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        for (const registration of registrations) {
            const user = await User.findById(registration.userId);
            if (user) {
                try {
                    let emailHtml = htmlTemplate
                        .replace('{{name}}', user.name)
                        .replace('{{eventTitle}}', event.name)
                        .replace('{{eventDate}}', event.date)
                        .replace('{{eventLocation}}', event.place)
                        .replace('{{eventDescription}}', event.description)
                        .replace('{{eventUrl}}', `${process.env.HOST}${process.env.PORT}/events/`)
                        .replace('{{unsubscribeUrl}}', `${process.env.HOST}${process.env.PORT}/users/${user._id}`);;
                    await transport.sendMail({
                        from: 'noreply@eventflow.com',
                        to: user.email,
                        subject: `L'evento ${event.name} è stato cancellato`,
                        html: emailHtml
                    });
                } catch (emailError) {
                    console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
                }
            }
        }
        const removedEvent = await Event.findByIdAndDelete(id);
        await Registration.deleteMany({ eventId: id });
        response.status(200).send(removedEvent);

    } catch (error) {
        response.status(400).send({ message: `Impossibile rimuovere l'evento`, error: error.message });
    }
};


