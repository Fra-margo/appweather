import { useState, useEffect } from 'react'
import { Card, Col, Row, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf, faWind, faDroplet, faArrowDownLong, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faSun as regularSun } from '@fortawesome/free-regular-svg-icons';
import { faSun as solidSun } from '@fortawesome/free-solid-svg-icons';
import { faSkyatlas } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = "3787f921056c5ba2098cb18cb96ecee3"

const MeteoOggi = ({ città }) => {
  const [meteoData, setMeteoData] = useState(null)
  const [errore, setErrore] = useState(null)

  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${città}&limit=1&appid=${apiKey}`
        const geoResponse = await fetch(geoApi)
        const [location] = await geoResponse.json()

        if (!location) {
          setErrore('Città non trovata');
          return;
        }

        const units = 'metric'
        const lang = 'it'

        const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
        const weatherResponse = await fetch(weatherApi)
        const weatherResult = await weatherResponse.json()

        setMeteoData(weatherResult)
        setErrore(null)
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
          <h3 className='text-center'>Meteo attuale</h3>
          <Card style={{ backgroundColor: 'lightcyan', borderColor: 'lightblue' }}>
            <Card.Body>
              <Row className='align-items-center'>
                <Col className='border-end'>
                  <img src={`http://openweathermap.org/img/wn/${meteoData.weather[0].icon}.png`} alt="MeteoIcon" />
                  <h2>{meteoData.name}, {meteoData.sys.country}</h2>
                  <p className='small'>Previsioni: {new Date().toLocaleDateString()}</p>
                </Col>
                <Col>
                  <Row >
                    <Col className='me-3 d-flex justify-content-center align-items-center'>
                      <p><FontAwesomeIcon icon={faTemperatureHalf} /> Temperatura: {meteoData.main.temp}°</p>
                      <div className='ms-3'>
                        <p className='small'>{meteoData.main.temp_max}°</p>
                        <hr />
                        <p className='small'>{meteoData.main.temp_min}°</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col className='d-flex justify-content-center align-items-center border-start border-end'>
                  <div>
                    <p><FontAwesomeIcon icon={faSkyatlas} className='me-2' />Clima: {meteoData.weather[0].description}</p>
                    <p><FontAwesomeIcon icon={faWind} className='me-2' />Vento: {meteoData.wind.speed} km/h</p>
                    <p><FontAwesomeIcon icon={faDroplet} className='me-2' />Umidità: {meteoData.main.humidity} %</p>
                    <p><FontAwesomeIcon icon={faArrowDownLong} className='me-2' />Pressione: {meteoData.main.pressure} hPa</p>
                  </div>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                  <div>
                    <p><FontAwesomeIcon icon={faLocationDot} className='me-2' />Lat: {meteoData.coord.lat} / Lon: {meteoData.coord.lon}</p>
                    <p>
                      <FontAwesomeIcon icon={solidSun} className='me-2' />Alba: {new Date(meteoData.sys.sunrise * 1000).toLocaleTimeString()} /
                      <FontAwesomeIcon icon={regularSun} className='ms-2' /> Tramonto: {new Date(meteoData.sys.sunset * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
      {errore && (
        <Alert variant="danger" className='mt-3'>
          {errore}
        </Alert>
      )}
    </div>
  );
}

export default MeteoOggi
