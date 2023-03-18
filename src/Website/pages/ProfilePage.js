import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";

const ProfilePage = () => {

    return (
        <div className="Profile-Page">
            <Container>
                <Row >
                    <Container >
                        <AlertBox />
                        <Row className='mt-3 mb-3 justify-content-center'>
                            <Col md={12} lg={10}>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/profile" className='breadcrumbCS'>My account</Link></li>
                                    </ol>
                                </nav>
                                <Row>
                                    <Col md={12}>
                                        <Card className='ProductFullCard mb-2'>
                                            <Card.Body className='p-4'>
                                                <p className='HomeblockCartBodyH1'>Profile</p>
                                                <Row>
                                                    
                                                </Row>
                                                <Row>
                                                    <Col md={3}>
                                                        <div className="d-grid col-12 mx-auto mb-3">
                                                            <Link className="btn LoginBtn text-white" to="/myaddress">My Address</Link>
                                                        </div>
                                                    </Col>
                                                    <Col md={3}>
                                                        <div className="d-grid col-12 mx-auto mb-3">
                                                            <Link className="btn LoginBtn text-white" to="/myorders">My orders</Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                
                            </Col>
                            

                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default ProfilePage;