import React, { createContext, useContext , useEffect, useState} from "react";
import { authService } from "../main";
import axios from "axios";
import type { AppContextType, LocationData, User } from "../types";


export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = AppContext.Provider;

interface AppContextProvider {
    children : React.ReactNode;
}

export const AppContextProvider = ({children} : AppContextProvider)=>{
    const [user, setUser] = useState<User | null>(null)
    const [isAuth, setIsAuth] = useState< Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)

    const [location, setLocation] = useState<LocationData | null>(null)
    const [locationLoading, setLocationLoading] = useState(false)
    const [city, setCity] = useState("fetching location...")

    async function fetchUser(){
        try {
            const token = localStorage.getItem("token");
            const {data} = await axios.get(`${authService}/api/auth/me`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Ashihs",data);
            setUser(data.user)
            setIsAuth(true)
            
        } catch (error) {
            console.log(error);        
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return(
        <AppProvider value={{user, isAuth, loading, setUser, setIsAuth, setLoading, location}}>
            {children}
        </AppProvider>
    )

}

export const useAppContext = () => {
    return useContext(AppContext)
}