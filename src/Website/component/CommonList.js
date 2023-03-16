import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import image from "../../images/Rectangle 649.png";

function CommonList() {
    return (
        <div className="CommonList mt-3 mb-3">
            <Row>
                <Col md={3}>
                    <Card className='cardH mb-2'>
                        <Card.Img variant="top" src={image} className="ProductImg" />
                        <Card.Body>
                            <Row>
                                <Col md={5}>
                                    <Card.Title className='CartBor'>Upto 40% off</Card.Title>
                                </Col>
                                <Col md={7}>
                                    <Card.Title className='proR mt-1'>Deal of the day</Card.Title>
                                </Col>
                            </Row>
                            <Card.Text className='proD'>  Oneplus Audio Days </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className='cardH mb-2'>
                        <Card.Img variant="top" src={image} className="ProductImg" />
                        <Card.Body>
                            <Row>
                                <Col md={5}>
                                    <Card.Title className='CartBor'>Upto 40% off</Card.Title>
                                </Col>
                                <Col md={7}>
                                    <Card.Title className='proR mt-1'>Deal of the day</Card.Title>
                                </Col>
                            </Row>
                            <Card.Text className='proD'>  Oneplus Audio Days </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className='cardH mb-2'>
                        <Card.Img variant="top" src={image} className="ProductImg" />
                        <Card.Body>
                            <Row>
                                <Col md={5}>
                                    <Card.Title className='CartBor'>Upto 40% off</Card.Title>
                                </Col>
                                <Col md={7}>
                                    <Card.Title className='proR mt-1'>Deal of the day</Card.Title>
                                </Col>
                            </Row>
                            <Card.Text className='proD'>  Oneplus Audio Days </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className='cardH mb-2'>
                        <Card.Img variant="top" src={image} className="ProductImg" />
                        <Card.Body>
                            <Row>
                                <Col md={5}>
                                    <Card.Title className='CartBor'>Upto 40% off</Card.Title>
                                </Col>
                                <Col md={7}>
                                    <Card.Title className='proR mt-1'>Deal of the day</Card.Title>
                                </Col>
                            </Row>
                            <Card.Text className='proD'>  Oneplus Audio Days </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CommonList;