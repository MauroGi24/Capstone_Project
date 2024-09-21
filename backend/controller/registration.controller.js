import Event from '../models/eventSchema.js'
import Registration from '../models/registrationSchema.js'
import User from '../models/userSchema.js'
import transport from '../services/mail.service.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export const newRegistration = async (request, response) => {
    try {
        const idUser = request.body.userId 
        const idEvent = request.body.eventId
        const existingRegistration = await Registration.findOne({ userId: idUser, eventId: idEvent });
        if (existingRegistration) {
            return response.status(400).send({ message: `Utente già registrato all'evento` });
        }
        const registration = new Registration(request.body);
        const createdRegistration = await registration.save();
        const user = await User.findById(idUser);
        const event = await Event.findById(idEvent)
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailRegistrationEvent.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8'); 
            try {
                let emailHtml = htmlTemplate.replace('{{name}}', user.name)
                .replace('{{eventTitle}}', event.name)
                .replace('{{eventDate}}', event.date)
                .replace('{{eventLocation}}', event.place)
                .replace('{{eventUrl}}', `${process.env.HOST}${process.env.PORT}/api/v1/events/${event._id}`)
                .replace('{{unsubscribeUrl}}', `${process.env.HOST}${process.env.PORT}/api/v1//users/${user._id}`);
                await transport.sendMail({
                    from: 'noreply@eventflow.com',
                    to: user.email, 
                    subject: `Registrazione a ${event.name} effettuata`, 
                    html: emailHtml
                });
            } catch (emailError) {
                console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
            }
        ;
        response.status(201).send(createdRegistration);
    } catch (error) {
        response.status(400).send({ message: 'Ricontrolla i dati', error: error.message });
    }
};

export const deleteRegistration = async (request, response) => {
    const id = request.params.id
    const registration = await Registration.findById(id)
    try {
        const user = await User.findById(registration.userId)
        const removeRegistration = await Registration.findByIdAndDelete(id)
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailDeleteUser.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8'); 
        try{
            let emailHtml = htmlTemplate.replace('{{name}}', user.name)
                await transport.sendMail({
                    from: 'noreply@eventflow.com',
                    to: user.email, 
                    subject: `Cancellazione account`, 
                    html: emailHtml
                });
        } catch(emailError){ 
                console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
        }
        response.send(removeRegistration) 
    } catch(error){
        response.status(400).send({message: `Impossibile rimuovere la registrazione`, error: error.message})
    }
}
