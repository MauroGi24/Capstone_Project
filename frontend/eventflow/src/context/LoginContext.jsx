import { useState, createContext, useEffect } from "react"
import { profile } from '../data/fetch.js'


export const LoginContext = createContext()

export default function LoginContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userInfo, setUserInfo] = useState()
    const getProfile = async () =>{
        try {
            const profileInfo = await profile();
            setUserInfo(profileInfo)
        } catch (error) {
           if(error.message === '401'){
            localStorage.removeItem('token')
            setToken(null)
           } 
        }      
    }
    const logout = () => {
        localStorage.removeItem('token');  
        setToken(null);  
        setUserInfo(null);  
    };

    useEffect(()=>{
        if (token) getProfile() 
    },[token])
    const value = {token, setToken, userInfo, setUserInfo, logout}
    return (
        <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    )
}