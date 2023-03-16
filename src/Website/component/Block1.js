import { Row, Col, Container } from 'react-bootstrap';

function Block1() {
    return (
        <Container fluid className='g-0 mb-4'>
            <Row className='g-0' >
                <Col sm={12} md={6}>
                    <div className='Homebg1 topbar home-inner'>
                        <p className='HH text-center'>SUMMER</p>
                        <p className='HH text-center'>COLLECTION</p>
                        <p className='hT text-center'>Lorem ipsum dolor sit amet consectetur. Aliquet ut sed pulvinar maecenas phasellus </p>
                    </div>
                </Col>
                <Col sm={12} md={6}>
                    <div className='Homebg2 topbar home-inner'>
                        <h1 className='HH1 text-center text-white'>FLAT</h1>
                        <h1 className='HDH text-center text-white'>50% OFF</h1>
                        <div className="d-grid col-4 mx-auto">
                            <button className="btn LoginBtn text-white " type="submit"> Shop Now</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Block1;