import React, { useState } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CallUs = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (name, event) => {

        let from = { ...formData };

        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

    }

    return (
        <div className="orderplaced">
            <Container>
                <Row>
                    <Container>
                        <Row className='mt-5 mb-5 justify-content-center'>
                            <Col md={12} lg={10}>
                                <Card className='orderplacedcard p-5'>
                                    <Card.Body>
                                        <Card.Title className='text-center fs mb-5'>Reach out to us</Card.Title>
                                        <Card.Text className='text-center ProductName mb-5'>For any order related query kindly call us at  &nbsp;  <b>+91 8632697523</b> </Card.Text>
                                        <Card.Text className='text-center mb-5'>OR</Card.Text>
                                        <Card.Title className='text-center fs mb-5'>Get a call from us</Card.Title>
                                        <Row className='mt-5 mb-4'>
                                            <Col xs={12} lg={4}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label className=''>Select Language</Form.Label>
                                                    <Form.Select aria-label="Default select example" className="loginInp" value={formData.listId ? formData.listId : ""} onChange={e => handleChange('listId', e)} required>
                                                        <option value="">English</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} lg={4}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label className=''>Phone Number</Form.Label>
                                                    <Form.Control type="number" className="form-control loginInp text-start" placeholder='9999999999' value={formData.email ? formData.email : ""} onChange={e => handleChange('email', e)} required />
                                                    <Form.Control.Feedback type="invalid" className='text-start'>Please Enter email</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} lg={4}>
                                                <div className="d-grid mx-auto mt-3">
                                                    <p></p>
                                                    <Link className="btn LoginBtn text-dark" to="#" type="submit">Call</Link>
                                                </div>
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

export default CallUs;