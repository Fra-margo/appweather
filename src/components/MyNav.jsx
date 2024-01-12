import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, useLocation } from 'react-router-dom'

const MyNav = () => {
    const location = useLocation()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>App Meteo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
                <Link to="/chisiamo" className={location.pathname === '/chisiamo' ? 'nav-link active' : 'nav-link'}>Chi Siamo</Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="*" >Accedi</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="*" >Registrati</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default MyNav