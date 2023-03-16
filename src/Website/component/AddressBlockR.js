import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AddressBlockR = () => {

    const [totalprice, setTotalPrice] = useState(0);

    let purchaseData = JSON.parse(localStorage.getItem('purchaseData'));

    const gettotalprice = () => {

        const cartlist = JSON.parse(localStorage.getItem('cartlist'));
        var price = 0;
        for (let i in cartlist) {
            if (cartlist[i].updatedprice) {
                price += cartlist[i].updatedprice;
            } else {
                price += cartlist[i].salePrice;
            }
            setTotalPrice(price);
        }
        
    }

    useEffect(() => {

        gettotalprice();

    }, []);

    return (
        <>
            <p className='HomeblockCartBodyH1'>Order Summary</p>
            <hr></hr>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Items</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>{purchaseData ? purchaseData.totalPrice : totalprice}</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Discount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>- $ 18.00  </p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Coupon Discount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>{purchaseData ? purchaseData.discountAmount : 0}</p>

                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Delivery charges</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>Free</p>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Order Total</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>{purchaseData ? purchaseData.subTotelPrice : totalprice}</p>
                </Col>
            </Row>

        </>
    );
}

export default AddressBlockR;