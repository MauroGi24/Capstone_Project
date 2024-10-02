
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