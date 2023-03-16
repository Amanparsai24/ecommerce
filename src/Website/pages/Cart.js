import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import AlertBox from "../../components/AlertBox";
import CartBlockL from '../component/CartBlockL';
import CartBlockR from '../component/CartBlockR';


const Cart = () => {



    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={8}>
                        <CartBlockL />
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body>
                                        <CartBlockR />
                                       
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Cart;