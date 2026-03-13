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
    latitude:number,
    longitude:number,
    formattedAddress:string
}

export interface AppContextType{
    user:User | null;
    isAuth:boolean;
    location:LocationData | null;
    setLocation:React.Dispatch<SetStateAction<LocationData | null>>
    loading:boolean;
    setUser: React.Dispatch<SetStateAction<User| null>>;
    setIsAuth: React.Dispatch<SetStateAction<boolean>>;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    city:string;


    // setLocati÷on:React.Dispatch<SetStateAction<LocationData | null>>
}