import Event from '../models/eventSchema.js'
import Registration from '../models/registrationSchema.js'
import User from '../models/userSchema.js'
import transport from '../services/mail.service.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export const allRegistrations = async (request, response) => {
    try {
        const registrations = await Registration.find().populate('userId').populate('eventId');
        response.status(200).send(registrations);
    } 
    catch (error) {
        response.status(500).send({ message: 'Impossibile recuperare le registrazioni', error: error.message });
    }
};

export const userRegistrations = async (request, response) => {
    const userId = request.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: 'Utente non trovato' });
      }  
      const registrations = await Registration.find({ userId: userId }).populate('eventId').populate('userId'); 
  
      if (registrations.length === 0) {
        return response.status(404).json({ message: 'Nessuna prenotazione trovata per questo utente' });
      }  
      response.status(200).json(registrations);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Errore durante il recupero della prenotazione', error: error.message });
    }
  };
  

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

export const updateRegistration = async (request, response) => {
    const id = request.params.id
    const { userName, userEmail} = request.body;
    try {
        const registration = await Registration.findById(id).populate('userId'); 

        if (!registration) {
          return response.status(404).send({ message: 'Registrazione non trovata' });
        }
    
        if (userName || userEmail) {
          const updatedUser = await User.findByIdAndUpdate(
            registration.userId._id, 
            {
              ...(userName && { name: userName }),  
              ...(userEmail && { email: userEmail }),  
            },
            { new: true, runValidators: true } 
          );
    
          if (!updatedUser) {
            return response.status(404).send({ message: 'Utente non trovato' });
          }
        }    
        response.status(200).send({ message: 'Utente aggiornato con successo' });
      } catch (error) {
        response
          .status(400)
          .send({ message: 'Errore durante l\'aggiornamento dell\'utente', error: error.message });
      }
    };

export const deleteRegistration = async (request, response) => {
    const id = request.params.id
    const registration = await Registration.findById(id)
    try {
        const user = await User.findById(registration.userId)
        const event = await Event.findById(registration.eventId)
        const removeRegistration = await Registration.findByIdAndDelete(id)
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailDeleteRegistration.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8'); 
        try{
            let emailHtml = htmlTemplate.replace('{{name}}', user.name)
                .replace('{{eventTitle}}', event.name)
                await transport.sendMail({
                    from: 'noreply@eventflow.com',
                    to: user.email, 
                    subject: `Cancellazione registrazione a ${event.name}`, 
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
