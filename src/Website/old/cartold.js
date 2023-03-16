import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import AlertBox from "../../components/AlertBox";
import AddressBlockL from '../component/AddressBlockL';
import AddressBlockR from '../component/AddressBlockR';
import CartBlockL from '../component/CartBlockL';
import CartBlockR from '../component/CartBlockR';
import PaymentBlockL from '../component/PaymentBlockL';
import PaymentBlockR from '../component/PaymentBlockR';

function Cart() {

    const [addressblock, setAddressBlock] = useState(0);
    const [paymentblock, setPaymentBlock] = useState(0);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={8}>
                            {
                                addressblock === 1 ?

                                    <AddressBlockL />

                                : paymentblock === 1 ?

                                    <PaymentBlockL />
                                :

                                    <CartBlockL />
                            }

                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={12}>
                                {
                                    addressblock === 1 ?

                                        <AddressBlockR setPaymentBlock={setPaymentBlock}/>

                                    : paymentblock === 1 ?

                                        <PaymentBlockR />
                                    :

                                    <CartBlockR setAddressBlock={setAddressBlock} />
                                }
                             
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Cart;