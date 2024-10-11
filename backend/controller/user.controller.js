import User from '../models/userSchema.js'
import transport from '../services/mail.service.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const allUsers = async (request, response) =>{
    const page = request.query.page
    const perPage = request.query.perPage
    const users = await User.find({}).sort({name: 1, surname: 1}).skip((page - 1) * perPage).limit(perPage)
    response.send(users)
}

export const user = async (request, response) =>{
    const id = request.params.id
    try {
        const user = await User.findById(id)
        response.send(user)
    }
    catch(error) {
        response.status(404).send({message: `L'utente non esiste o è stato cancellato`, error: error.message})
    }
}

export const newUser =  async (request, response) =>{
    const existUser = await User.findOne({email: request.body.email})
    if (existUser) return response.status(400).send(`Esiste già un utente registrato con questa email`)
    try {
        const avatarPath = request.file ? request.file.path : 'https://res.cloudinary.com/djei5uwt3/image/upload/v1726793646/profiles/jmaprumpx9ntef7s5ecl.png';
        const user = new User({
            name: request.body.name,
            surname: request.body.surname,
            email: request.body.email,
            password: await bcrypt.hash(request.body.password, 10),
            role: request.body.role,
            birthDate: request.body.birthDate,
            avatar: avatarPath,
            verifiedAt: new Date()
        });       
        const createdUser = await user.save();
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const templatePath = path.join(dirname, '../templates/emailNewUser.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8'); 
        try{
            let emailHtml = htmlTemplate.replace('{{name}}', user.name)
                .replace('{{userName}}', user.name)
                .replace('{{userSurname}}', user.surname)
                .replace('{{userEmail}}', user.email)
                .replace('{{eventUrl}}', `${process.env.HOST}${process.env.PORT}/api/v1/events`)
                .replace('{{unsubscribeUrl}}', `${process.env.HOST}${process.env.PORT}/api/v1/users/${user._id}`);
                await transport.sendMail({
                    from: 'noreply@eventflow.com',
                    to: user.email, 
                    subject: `Benvenuto su EventFlow ${user.name}`, 
                    html: emailHtml
                });
        } catch{(emailError) 
                console.error(`Errore durante l'invio della mail a ${user.email}: ${emailError.message}`);
        }
        response.status(201).send(createdUser);
    } catch (error) {
        response.status(400).send({ message: 'Ricontrolla i dati', error: error.message });
    }
}

export const updateUser = async (request, response) => {
    const id = request.params.id;
    const modifiedUser = request.body;
    try {
        if (modifiedUser.email) {
            const existingUser = await User.findOne({ email: modifiedUser.email });
            
            if (existingUser && existingUser._id.toString() !== id) {
                return response.status(400).send({ message: 'Email già in uso da un altro utente.' });
            }
        }
        if (request.file && request.file.path) {
            modifiedUser.avatar = request.file.path; 
        }  
        const updatedUser = await User.findByIdAndUpdate(id, { $set: modifiedUser }, { new: true });        
        if (!updatedUser) {
            return response.status(404).send({ message: 'Utente non trovato per l\'aggiornamento.' });
        }
        response.status(200).send(updatedUser); 
    } catch (error) {
        response.status(400).send({ message: `Errore nella modifica dell'utente`, error: error.message });
    }
};

export const deleteUser = async (request, response) => {
    const id = request.params.id
    try{
        const user = await User.findById(id)
        const removeUser = await User.findByIdAndDelete(id)
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
        response.send(removeUser)
    }
    catch(error) {
        response.status(400).send({message: `Impossibile rimuovere l'utente`, error: error.message})
    }
}

export const login = async (request, response) => {
    const user = await User.findOne({email: request.body.email}).select('+password') 
    if(!user) return response.status(401).send('Credenziali incorrette')
    if(!(await bcrypt.compare(request.body.password, user.password))){
        return response.status(401).send('Credenziali incorrette')
    }
    jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {
            expiresIn: '12h'
        },
        (err, jwtToken) =>{
            if (err) return response.status(401).send();
            return response.send({
                token: jwtToken
            })
        }
    )
}
export const profile = async(request, response) =>{
    const user = 
    response.send(request.loggedUser)
}