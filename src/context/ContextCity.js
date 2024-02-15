import { createContext, useEffect, useState } from "react";

const ContextCity = createContext()

export const CityProvider = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState(localStorage.getItem('city') || 'İstanbul')
    const [trCities, setTrCities] = useState([]);
    
    useEffect(() => {
        const cityURL = `https://turkiyeapi.cyclic.app/api/v1/provinces?fields=id%2Cname`;
        const cityGetter = async () => {
            const response = await fetch(cityURL)
            const dataCity = await response.json()
            setTrCities(dataCity.data)
            localStorage.setItem('city', selectedCity)
        }
        cityGetter()
    }, [selectedCity])

    const values = {
        selectedCity,
        setSelectedCity,
        trCities,
        setTrCities,
      };
    
    return <ContextCity.Provider value={values}>{children}</ContextCity.Provider>
}

export { ContextCity }