
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ContactUs() {

    return (
        <div className="orderplaced">
            <Container>
                <Row>
                    <Container>
                        <Row className='mt-5 mb-5 justify-content-center'>
                            <Col md={12} lg={12}>
                                <Card className='orderplacedcard p-5'>
                                    <Card.Body>
                                        <Card.Title className='text-center fs'>Want to chat or get a call from us?</Card.Title>
                                        <Row className='mt-5 mb-4'>
                                            <Col xs={12} lg={6}>
                                                <Card className='p-3 contactcard mb-3 '>
                                                <Card.Body>
                                                    <Card.Title className='text-center'>Chat with us</Card.Title>
                                                        <Row className="justify-content-center">
                                                            <Col xs={12} lg={8}>
                                                                <Card.Text className='Contacthight'>Our messaging assistant can quickly solve many issues or direct you to the right person or place.</Card.Text>
                                                            </Col>
                                                        </Row> 
                                                        <Row className="justify-content-center">
                                                            <Col xs={12} lg={4}>
                                                                <div className="d-grid mx-auto">
                                                                    <Link className="btn wishListBtn text-white mt-3" to="#" type="submit">Start Chatting</Link>
                                                                </div>
                                                            </Col>
                                                        </Row> 
                                                </Card.Body>
                                              </Card>
                                            </Col>
                                            <Col xs={12} lg={6}>
                                                <Card className='p-3 contactcard'>
                                                    <Card.Body>
                                                        <Card.Title className='text-center'>Call Us</Card.Title>
                                                        <Row className="justify-content-center">
                                                            <Col xs={12} lg={8}>
                                                                <Card.Text className='Contacthight'>We'll first get a few details about your issue and then someone will call you right away.</Card.Text>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-center">
                                                            <Col xs={12} lg={4}>
                                                                <div className="d-grid mx-auto">
                                                                    <Link className="btn wishListBtn text-white mt-3" to="/callus" type="submit">Call Us</Link>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row> 
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default ContactUs;