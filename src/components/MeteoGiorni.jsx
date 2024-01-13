import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const apiKey = "3787f921056c5ba2098cb18cb96ecee3"

const MeteoGiorni = ({ città }) => {
    const [meteoGiorniData, setMeteoGiorniData] = useState(null)
    const [errore, setErrore] = useState(null)

    useEffect(() => {
        const fetchMeteoGiorni = async () => {
            try {
                const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${città}&limit=1&appid=${apiKey}`
                const geoResponse = await fetch(geoApi)
                const [location] = await geoResponse.json()

                if (!location) {
                    setErrore('Città non trovata')
                    return;
                }

                const units = 'metric'
                const lang = 'it'

                const weatherForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=${units}&lang=${lang}`
                const weatherForecastResponse = await fetch(weatherForecastApi)
                const weatherForecastResult = await weatherForecastResponse.json()

                setMeteoGiorniData(weatherForecastResult)
                setErrore(null)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        if (città) {
            fetchMeteoGiorni()
        }
    }, [città])

    const organizeDataByDay = () => {
        const organizedData = {}

        if (meteoGiorniData) {
            meteoGiorniData.list.forEach((item) => {
                const date = new Date(item.dt_txt)
                const day = date.toLocaleDateString()

                if (!organizedData[day]) {
                    organizedData[day] = []
                }

                organizedData[day].push({
                    time: date.toLocaleTimeString(),
                    temperature: item.main.temp,
                    icon: item.weather[0].icon
                });
            });
        }

        return organizedData
    };

    const organizedData = organizeDataByDay()

    const giorniArray = Object.keys(organizedData)

    const temperatureData = giorniArray.map((giorno) => ({
        giorno,
        temperaturaMedia: Number((organizedData[giorno].reduce((acc, data) => acc + data.temperature, 0) / organizedData[giorno].length).toFixed(2)),
}));
    return (
        <div className='mt-5 mb-5'>
            {organizedData && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3>Meteo della settimana</h3>
                    <Row xs={1} md={2} lg={3} xl={6} style={{ justifyContent: 'space-around' }}>
                        {giorniArray.map((giorno, index) => (
                            <Col key={index} style={{ margin: '1rem 0' }}>
                                <Card style={{ height: '100%', backgroundColor: 'lightcyan', borderColor: 'lightblue' }}>
                                    <Card.Img variant="top" src={`http://openweathermap.org/img/wn/${organizedData[giorno][0].icon}.png`} alt="MeteoIcon" />
                                    <Card.Body>
                                        <Card.Title className='text-center' style={{ color: 'rgb(35, 35, 150)' }}>{giorno}</Card.Title>
                                        {organizedData[giorno].map((data) => (
                                            <div key={data.time}>
                                                <Card.Text className='mb-2 p-2' style={{ backgroundColor: 'rgb(195, 244, 242)', borderRadius: '10px' }}>
                                                    Ora: {data.time} - <br /> Temperatura: {data.temperature} °C
                                                </Card.Text>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {errore && (
                <Alert variant="danger" className='mt-3'>
                    {errore}
                </Alert>
            )}
            {temperatureData.length > 0 && (
                <Container className='mt-5 d-flex flex-column align-items-center justify-content-center'>
                    <h3 className='text-center mb-3'>Andamento delle temperature</h3>
                            <LineChart width={600} height={300} data={temperatureData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                <XAxis dataKey="giorno" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temperaturaMedia" stroke="#8884d8" />
                            </LineChart>
                </Container>
            )}
        </div>
    );
};

export default MeteoGiorni;