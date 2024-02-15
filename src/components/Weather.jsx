import React, { useContext } from 'react'
import { useApi } from '../context/ContextApi'
import { ContextCity } from "../context/ContextCity";
import pressureIcon from "../assets/img/thermometer.png";
import humidity from "../assets/img/humidity.png";

const Weather = () => {
    const { data, loading, error } = useApi()
    const { selectedCity, setSelectedCity, trCities } = useContext(ContextCity)

    if (loading) return <div className='loading'> <span className="loader"></span> </div>
    if (error) return <p>Error: {error}</p>
    
    const mouseScroll = (event) => {
        let scrollWeahter = document.querySelector('.weather-wrapper')
        event.deltaY > 0 ? scrollWeahter.scrollLeft += 370
            : scrollWeahter.scrollLeft -= 370
    }

    return (
        <div className='container'>
            <h1>TURKIYE WEATHER APP</h1>
            <div className="select">
                <select className='select' value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    {trCities.map(city => (
                        <option className='optionCity' key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>
            {data && data.list && data.list.length > 0 ?
                <div className='weather-wrapper' onWheel={mouseScroll}>
                    {data.list.slice(0, 9).map((day, index) => {
                        // Parse the date string!
                        const date = new Date(day.dt_txt)

                        // Fornat the date as it is wanted by developer over below.
                        const formatted_date = date.toLocaleDateString('en-EN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit'
                        })
                        const rounded_min = Math.round(day.main.temp_min)
                        const rounded_max = Math.round(day.main.temp_max)
                        
                        return (
                            <div key={index} className="day-weather">
                                <p className='date'>{formatted_date}</p>
                                <div className="temp">
                                    <p><small>min</small> {rounded_min} &#8451;</p>
                                    {/* <p><small>now</small>{Math.round(day.main.temp)} &#8451;</p> */}
                                    <p><small>max</small> {rounded_max} &#8451;</p>
                                </div>
                                <div className="weather-desc">
                                    <p className='main-desc'>{day.weather[0].main}</p>
                                    <p>{day.weather[0].description}</p>
                                    <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="weather icon" />
                                </div>
                                <div className="weather-detail">
                                    <p><img src={pressureIcon} alt="pressure" /> {day.main.pressure} &#13225;</p>
                                    <p><img src={humidity} alt="humidity" /> {day.main.humidity} &#x25;</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div>
                    <p>NO WEATHER DATA AVAILABLE FOR THE SELECTED CITY ...</p>
                </div>
            }
        </div>
    )
}

export default Weather
