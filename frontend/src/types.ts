import type { SetStateAction } from "react"
import type React from "react"

export interface User{
    _id:string,
    name:string,
    email:string,
    image:string,
    role:string
}

export interface LocationData{
    latitude:string,
    longitude:string,
    formattedAdress:string
}

export interface AppContextType{
    user:User | null;
    isAuth:boolean;
    location:LocationData | null;
    loading:boolean;
    setUser: React.Dispatch<SetStateAction<User| null>>;
    setIsAuth: React.Dispatch<SetStateAction<boolean>>;
    setLoading: React.Dispatch<SetStateAction<boolean>>;


    // setLocati÷on:React.Dispatch<SetStateAction<LocationData | null>>
}