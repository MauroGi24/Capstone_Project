import Review from '../models/reviewSchema.js'
 

export const newReview = async (request, response) => {
    try {
        const review = new Review({...request.body, event: request.params.eventId});
        const createdReview = await review.save();
        response.status(201).send(createdReview);
    } catch (error) {
        response.status(400).send({ message: 'Ricontrolla i dati', error: error.message });
    }
};

export const review = async (request, response) =>{
    const id = request.params.id
    try {
        const review = await Review.findById(id).populate('event').populate('user')
        response.send(review)
    }
    catch(error) {
        response.status(404).send({message: `La review non esiste o è stata cancellata`, error: error.message})
    }
}

export const updateReview = async (request, response) => {
    const id = request.params.id
    const modifiedReview = request.body
    try {        
        const newReview = await Review.findByIdAndUpdate(id, { $set: modifiedReview }, { new: true });
        response.status(200).send(newReview);        
    }catch (error) {
        response.status(400).send({ message: `Errore nella modifica della review`, error: error.message });
    }
}

export const deleteReview = async (request, response) => {
    const id = request.params.id;
    
    try {
        const removedReview = await Review.findByIdAndDelete(id);
        response.status(200).send(removedReview);
    }catch (error) {
        response.status(400).send({ message: `Impossibile rimuovere la review`, error: error.message });
    }
};


