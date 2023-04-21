import { Row, Col, Container, Card } from 'react-bootstrap';

function Block1() {
    return (
        <Container fluid className='g-0 mb-4'>
            <Row className='g-0' >
                <Col sm={12} md={6} lg={6}>
                    <Card className="Homebg1">
                        <Card.Body>
                            <Row className="justify-content-center ">
                                <Col lg={6}>
                                    <p className='HH text-center mt-4'>SUMMER COLLECTION</p>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col lg={12}>
                                    <p className='hT text-center'>Lorem ipsum dolor sit amet consectetur. Aliquet ut sed pulvinar maecenas phasellus </p>
                                </Col>
                            </Row>
                        </Card.Body>
                   </Card>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Card className="Homebg2">
                        <Card.Body>
                            <Row className="justify-content-center ">
                                <Col lg={6}>
                                    <p className='HH text-center text-white mt-4'>FLAt</p>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col lg={6}>
                                    <p className='HDH text-center text-white'>50% off</p>
                                </Col>
                            </Row>
                            <div className="d-grid col-lg-4 col-sm-8 mx-auto">
                                <button className="btn LoginBtn text-white " type="submit"> Shop Now</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Block1;