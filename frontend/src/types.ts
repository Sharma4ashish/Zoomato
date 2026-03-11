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
    isAuth:Boolean;
    location:LocationData | null;
    loading:Boolean;
    setUser: React.Dispatch<SetStateAction<User| null>>;
    setIsAuth:React.Dispatch<SetStateAction< Boolean>>;
    setLoading:React.Dispatch<SetStateAction<Boolean>>;
    // setLocati÷on:React.Dispatch<SetStateAction<LocationData | null>>
}