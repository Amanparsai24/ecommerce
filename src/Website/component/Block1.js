import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, Bounce } from 'react-awesome-reveal';
function Block1() {

    const navigate = useNavigate();
    const handleClick = () => {
        // { state: id }
        setTimeout(() => {
            navigate('/product', { state: { flat: 50 } })
        }, 10);
    }

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
                            <Slide direction={"up"}>
                                <Row className="justify-content-center ">
                                    <Col lg={6}>
                                        <p className='HH text-center text-white mt-4'>FLAt</p>
                                    </Col>
                                </Row>
                            </Slide>
                            <Bounce delay={1e3} cascade damping={3e-1}>
                                <Row className="justify-content-center">
                                    <Col lg={6}>
                                        <p className='HDH text-center text-white'>50% off</p>
                                    </Col>
                                </Row>
                            </Bounce>
                            <div className="d-grid col-lg-4 col-sm-8 mx-auto">
                                <Link className="btn LoginBtn text-white" onClick={e => handleClick()} > Shop Now</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Block1;