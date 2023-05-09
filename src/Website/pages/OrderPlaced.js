import React, { useEffect } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import suc from "../../images/Group 20.png";
import { useNavigate } from 'react-router-dom';

function OrderPlaced() {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('paymentID')) {
            localStorage.removeItem("productDetails");
            localStorage.removeItem("userAddressID");
            localStorage.removeItem("buyNowdata");
            localStorage.removeItem("purchaseData");
            localStorage.removeItem("buyNow");
            localStorage.removeItem("paymentID");

         } else {
            navigate('/');
        }


    }, []);

    return (
        <div className="orderplaced">
            <Container>
                <Row>
                    <Container>
                        <Row className='mt-5 mb-5 justify-content-center'>
                            <Col md={12} lg={7}>
                                <Card className='orderplacedcard p-5'>
                                    <Card.Body>
                                        <Row className="justify-content-center">
                                            <Col xs={12} lg={3}>
                                                <img src={suc} className="img-fluid HomeIMg" alt="..." />
                                            </Col>
                                        </Row> 
                                        <Card.Title className='text-center mt-4'>Yaay! Your order is placed</Card.Title>
                                        <Card.Text className='text-center'>You will receive a confirmation email with order details</Card.Text>
                                        <Row className="justify-content-center">
                                            <Col xs={12} lg={8}>
                                                <div className="d-grid mx-auto">
                                                    <Link className="btn wishListBtn text-white mt-3" to="/product" type="submit">Explore more products</Link>
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={8}>
                                                <div className="d-grid mx-auto">
                                                    <Link className="btn wishListBtn text-white mt-3" to="/myorders" type="submit">Order Details</Link>
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

export default OrderPlaced;