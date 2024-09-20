import User from '../models/userSchema.js'
import transport from '../services/mail.service.js'

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
    try {
        const avatarPath = request.file ? request.file.path : 'https://res.cloudinary.com/djei5uwt3/image/upload/v1726793646/profiles/jmaprumpx9ntef7s5ecl.png';
        const user = new User({...request.body, avatar: avatarPath});
        const createdUser = await user.save();
        response.status(201).send(createdUser);
        await transport.sendMail({
            from: 'noreply@eventflow.com',
            to: createdUser.email, 
            subject: "Benvento su EventFlow", 
            text: "Hai effettuato la registrazione", 
            html: "<b>Hai effettuato la registrazione</b>"
        })
    } catch (error) {
        response.status(400).send({ message: 'Ricontrolla i dati', error: error.message });
    }
}

export const updateUser = async (request, response) => {
    const id = request.params.id
    const modifiedUser = request.body
    try {
        const newUser = await User.findByIdAndUpdate(id, { $set: modifiedUser, new: true });
        response.status(200).send(newUser);
    } catch (error) {
        response.status(400).send({ message: `Errore nella modifica dell'utente`, error: error.message });
    }
}

export const changeAvatar = async (request, response) => {
    const id = request.params.id
    try {
        const avatarUser = await User.findByIdAndUpdate(id, {avatar: request.file.path}, {new:true})
        response.status(200).send(avatarUser)
    } catch (error) {
        response.status(400).send({message: `Impossibile modificare l'immagine`, error: error.message})
    }
}

export const deleteUser = async (request, response) => {
    const id = request.params.id
    try{
        const removeUser = await User.findByIdAndDelete(id)
        response.send(removeUser)
    }
    catch(error) {
        response.status(400).send({message: `Impossibile rimuovere l'utente`, error: error.message})
    }
}

