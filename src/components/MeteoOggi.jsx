import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = "3787f921056c5ba2098cb18cb96ecee3"

const MeteoOggi = ({ città }) => {
    const [meteoData, setMeteoData] = useState(null)

    useEffect(() => {
        const fetchMeteo = async () => {
            try {
                const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${città}&limit=1&appid=${apiKey}`
                const geoResponse = await fetch(geoApi)
                const [location] = await geoResponse.json()

                const units = 'metric'
                const lang = 'it'

                const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
                const weatherResponse = await fetch(weatherApi)
                const weatherResult = await weatherResponse.json()

                setMeteoData(weatherResult)
            } catch (error) {
                console.error('Error fetch', error)
            }
        }
        if (città) {
            fetchMeteo()
        }
    }, [città])

    return (
        <div className='mt-5'>
            {meteoData && (
                <div>
                    <h3>Meteo attuale</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${meteoData.weather[0].icon}.png`} alt="MeteoIcon" />
                            <h2>{meteoData.name}, {meteoData.sys.country}</h2>
                            <p className='small'>Previsioni: {new Date().toLocaleDateString()}</p>

                        </div>
                        <div className='d-flex align-items-center'>
                                <p className='me-3'>Temperatura: {meteoData.main.temp}°</p>
                            <div>
                                <p className='small'>{meteoData.main.temp_max}°</p>
                                <hr />
                                <p className='small'>{meteoData.main.temp_min}°</p>
                            </div>
                        </div>
                        <div>
                            <p>Clima: {meteoData.weather[0].description}</p>
                            <p>Vento: {meteoData.wind.speed} km/h</p>
                            <p>Umidità: {meteoData.main.humidity} %</p>
                            <p>Pressione: {meteoData.main.pressure} hPa</p>
                        </div>
                        <div>
                            <p>Lat: {meteoData.coord.lat} / Lon: {meteoData.coord.lon}</p>
                            <p>
                                Alba: {new Date(meteoData.sys.sunrise * 1000).toLocaleTimeString()} /
                                Tramonto: {new Date(meteoData.sys.sunset * 1000).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MeteoOggi
