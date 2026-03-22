import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../main";
import axios from "axios";
import type { AppContextType, LocationData, User } from "../types";


export const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
    children: React.ReactNode;
}
export const AppProvider = ({ children }: AppProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState<LocationData | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [city, setCity] = useState("Fecthing Location...");

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get(`${authService}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (!navigator.geolocation) return alert("Please Allow Location to Continue");
        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // const result  = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();

                // console.log(data);
                

                setLocation({
                    longitude,
                    latitude,
                    formattedAddress:data.display_name || "current locaiton"
                })
                setLoadingLocation(false);
                setCity(data.address.city || data.address.town || data.address.village || "Your location")

            } catch (error) {
                console.log(error);
                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: "current locaiton"
                })

                setCity("error fetching city ")
            }
        })
    },[])

    return (
        <AppContext.Provider value={{ city, user, isAuth, loading, setUser, setIsAuth, setLoading, location, setLocation , loadingLocation}}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppData = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppData must be used within AppProvider");
    }
    return context;
};
