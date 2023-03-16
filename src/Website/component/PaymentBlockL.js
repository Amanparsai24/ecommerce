import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAddressAction } from "../../action/Front.action";

function PaymentBlockL() {

    const [useraddress, setUserAddress] = useState();

    const getaddressList = async () => {
        if (localStorage.loginType === 'user' && localStorage.userType) {
            const userAddressID = JSON.parse(localStorage.getItem('userAddressID'));
            const resp = await getAddressAction();
            if (resp.code === 200) {
                const addresses = resp.data[0].addresses;
                for (let i in addresses) {
                    let addressesid = addresses[i]._id;
                    if (addressesid === userAddressID) {
                        setUserAddress(addresses[i]);
                    }
                }
            }
        }
    }

    // console.log(useraddress);

    useEffect(() => {

        getaddressList();

    }, []);

    return (
        <>
            <Card className='ProductFullCard mb-2'>
                <Card.Body className='p-4'>
                    <Row>
                        <Col md={5}>
                            <p className='HomeblockCartBodyH1'>1.&nbsp;&nbsp;Delivery address</p>
                        </Col>
                        <Col md={5}>
                            <Col md={12}>
                                <Row>
                                    <Col md={12}>
                                        <p className='CartText'>{useraddress?useraddress.name:""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p className='CartText'>{useraddress ? useraddress.houseNumber : ""},{useraddress ?useraddress.streetAddess:""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p className='CartText'>{useraddress ? useraddress.city : ""},{useraddress ? useraddress.state : ""},{useraddress ? useraddress.pinCode : ""},{useraddress ?useraddress.country:""}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                        <Col md={2}>
                            <p className='ProductH text-end '><Link className='text-decoration-none'>change</Link></p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
          
        </>
    );
}

export default PaymentBlockL;