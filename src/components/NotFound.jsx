import { Container, Row, Col } from "react-bootstrap"

const NotFound = () => {
    return (
        <Container>
            <Row className="mt-4 flex-column align-items-center">
                <Col xs={12} md={6}>
                    <h3 className="mt-2 text-center">La sezione è al momento sotto manutenzione</h3>
                </Col>
            </Row>
        </Container>
    )

}

export default NotFound