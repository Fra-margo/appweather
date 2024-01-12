import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const apiKey = "3787f921056c5ba2098cb18cb96ecee3";

const MeteoGiorni = ({ città }) => {
    const [meteoGiorniData, setMeteoGiorniData] = useState(null);
    const [giornoCorrente, setGiornoCorrente] = useState(0);

    useEffect(() => {
        const fetchMeteoGiorni = async () => {
            try {
                const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${città}&limit=1&appid=${apiKey}`;
                const geoResponse = await fetch(geoApi);
                const [location] = await geoResponse.json();

                const units = 'metric';
                const lang = 'it';

                const weatherForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
                const weatherForecastResponse = await fetch(weatherForecastApi);
                const weatherForecastResult = await weatherForecastResponse.json();

                setMeteoGiorniData(weatherForecastResult);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (città) {
            fetchMeteoGiorni();
        }
    }, [città]);

    const organizeDataByDay = () => {
        const organizedData = {};

        if (meteoGiorniData) {
            meteoGiorniData.list.forEach((item) => {
                const date = new Date(item.dt_txt);
                const day = date.toLocaleDateString();

                if (!organizedData[day]) {
                    organizedData[day] = [];
                }

                organizedData[day].push({
                    time: date.toLocaleTimeString(),
                    temperature: item.main.temp,
                    icon: item.weather[0].icon
                });
            });
        }

        return organizedData;
    };

    const organizedData = organizeDataByDay();

    const giorniArray = Object.keys(organizedData);

    const mostraGiornoSuccessivo = () => {
        setGiornoCorrente((prevGiorno) => Math.min(prevGiorno + 1, giorniArray.length - 1));
    };

    const mostraGiornoPrecedente = () => {
        setGiornoCorrente((prevGiorno) => Math.max(prevGiorno - 1, 0));
    };

    return (
        <div className='mb-5'>
            <h3>Meteo della settimana</h3>
            {organizedData && (
                <div className='container mt-3'>
                    <div className='d-flex justify-content-between m-4'>
                        <Button variant="primary" onClick={mostraGiornoPrecedente} disabled={giornoCorrente === 0}>Giorno Precedente</Button>
                        <Button variant="primary" onClick={mostraGiornoSuccessivo} disabled={giornoCorrente === giorniArray.length - 1}>Giorno Successivo</Button>
                    </div>
                    {giorniArray.map((giorno, index) => (
                        <div key={index} style={{ display: index === giornoCorrente ? 'block' : 'none' }}>
                            <h5 className='text-center'>{giorno}</h5>
                            {organizedData[giorno].map((data) => (
                                <div key={data.time} className='text-center'>
                                        <img src={`http://openweathermap.org/img/wn/${data.icon}.png`} alt="MeteoIcon" />
                                        <p>Ora: {data.time}</p>
                                        <p>Temperatura: {data.temperature} °C</p>
                                        <hr />                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MeteoGiorni;