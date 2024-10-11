//Fetch Login
export const login = async (formValue) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body:JSON.stringify (formValue)
        })
        if(res.ok){
            const data = await res.json();
            return data
        }else {const errorData = await res.json()
            return {error: errorData.message || 'Credenziali incorrette'}
        }
         
    } catch (error) {
        return {error: 'Errore, riporva più tardi'} 
    }    
}

//Fetch per profilo
export const profile = async() =>{
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/profile`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(!res.ok){
        throw new Error(res.status)
    }
    const data = await res.json();
    return data
}

//Fetch per modificare il profilo

export const updateUser = async(updatedUserData, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}`, {
    method: 'PUT', 
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
    },
    body: updatedUserData, 
    });

    if (response.ok) {
    const data = await response.json();
    return data; 
    } else {
    console.error('Errore durante l\'aggiornamento dell\'utente');
    }
} catch (error) {
    console.error('Errore durante la richiesta:', error);
}
}

//Fetch per eliminare il profilo

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
    });

    if (response.ok) {
      return true; 
    }
  } catch (error) {
    console.error('Errore durante la cancellazione:', error);
    return false;
  }
};

//Fetch per recuperare tutti gli eventi

export const events = async () =>{
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/`,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!res.ok){
        throw new Error(res.status)
    }
    const data = await res.json();
    return data
}

//Fetch per creare evento

export const createEvent = async (eventData) => {
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('description', eventData.description);
    formData.append('date', eventData.date);
    formData.append('place', eventData.place);
    formData.append('category', eventData.category);
    formData.append('cover', eventData.cover); 

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: formData, 
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Errore nella creazione dell\'evento');
      }
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }
  };

//Fetch per modificare evento

export const updateEvent = async (eventData) => {
const formData = new FormData();
formData.append('name', eventData.name);
formData.append('description', eventData.description);
formData.append('date', eventData.date);
formData.append('place', eventData.place);
formData.append('category', eventData.category);

// Aggiungi il file di cover solo se è presente (viene aggiornato)
if (eventData.cover) {
    formData.append('cover', eventData.cover);
}

try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/${eventData._id}`, {
    method: 'PUT', 
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
    },
    body: formData, 
    });

    if (response.ok) {
    const data = await response.json();
    return data; 
    } else {
    console.error('Errore durante l\'aggiornamento dell\'evento');
    }
} catch (error) {
    console.error('Errore durante la richiesta:', error);
}
};  

//Fetch per eliminare evento

export const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });
  
      if (response.ok) {
        return true; 
      }
    } catch (error) {
      console.error('Errore durante la cancellazione:', error);
      return false;
    }
  };

//Fetch per recuperare tutte le prenotazioni

export const registrationsEvents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/registrations/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        console.error('Errore nel recupero delle prenotazioni');
      }
    } catch (error) {
      console.error('Errore nella richiesta:', error);
    }
  };

  //Fetch per recuperare una specifica prenotazione

  export const reservationUser = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/registrations/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        console.error('Errore nel recupero della prenotazione');
      }
    } catch (error) {
      console.error('Errore nella richiesta:', error);
    }
  };


export const updateRegistration = async (updatedData) => {
  const formData = new FormData();
  formData.append("userName", updatedData.userId.name);
  formData.append("email", updatedData.userId.email);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/registrations/${updatedData._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Errore nella modifica della prenotazione");
    }
  } catch (error) {
    console.error("Errore durante la richiesta:", error);
  }
};

export const deleteRegistration = async (registrationId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/registrations/${registrationId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
        })
  
        if (response.ok) {
          const data = await response.json();
          return data
        } else {
          console.error('Errore nella cancellazione della registrazione');
        }
      } catch (error) {
        console.error('Errore nella richiesta:', error);
      }
}
  