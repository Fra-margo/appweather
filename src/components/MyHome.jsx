import { useState } from 'react';
import MeteoOggi from './MeteoOggi';
import MeteoGiorni from './MeteoGiorni';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';

const MyHome = () => {
    const [città, setCittà] = useState('')
    const [mostraMeteo, setMostraMeteo] = useState(false)

    const handleSearch = () => {
        setMostraMeteo(true)
    }

    return (
        <Container>
            <div className='text-center m-3'>
                <h3>Vedi il meteo della tua città</h3>
                <div className='d-flex justify-content-center'>
                    <input
                        type="text"
                        className='form-control'
                        style={{width: '250px'}}
                        value={città}
                        placeholder="Inserisci città"
                        onChange={(e) => setCittà(e.target.value)}
                    />
                    <Button className="btn btn-primary ms-3" onClick={handleSearch}>Cerca</Button>
                </div>
            </div>

            {mostraMeteo &&
            <MeteoOggi città={città} />}
            {mostraMeteo && <MeteoGiorni città={città} />}
        </Container>
    );
};

export default MyHome;
