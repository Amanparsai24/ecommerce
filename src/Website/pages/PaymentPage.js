import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import AlertBox from "../../components/AlertBox";
import PaymentBlockL from '../component/PaymentBlockL';
import PaymentBlockR from '../component/PaymentBlockR';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAddressAction } from "../../action/Front.action";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';

const PaymentPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [addresslist, setAddressList] = useState({});

    const getAddressList = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await getAddressAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setAddressList(resp.data[0].addresses);
        }
    }

    const handleChange = (e, name) => {

        let data = { ...formData };
        if (name === 'checkbox') {

            if (e.target.checked) {
                data[name] = e.target.value;
            } else {
                data[name] = "";
            }

        } else {
            data[name] = e.target.value;
        }

        setFormData(data);
    }

    const selectpaymentmethod = () => {
        if (localStorage.loginType === 'user' && localStorage.userType) {
            if (formData.paymentId) {
                var paymentID = formData.paymentId;
                const userAddressID = JSON.parse(localStorage.getItem('userAddressID'));
                // localStorage.setItem('userAddressID', JSON.stringify(userAddressID));
                setTimeout(() => {
                    navigate('/orderplaced');
                }, 500);

            } else {
                dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Payment Method", type: '' }));
            }
        } else {

        }
    }

    useEffect(() => {

        getAddressList();

    }, [formData]);

    return (
        <div className="Address-Page">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={8}>
                        <PaymentBlockL />
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body className='p-4'>
                                <Row>
                                    <Col md={12}>
                                        <p className='HomeblockCartBodyH1'>2.&nbsp;&nbsp;Payment Method</p>
                                    </Col>
                                </Row>
                                {
                                    addresslist && addresslist.length > 0 && addresslist.map((item, ind) => {
                                        let checked = (formData.addressId && formData.addressId === item._id) ? true : false;
                                        return <Fragment key={ind}>
                                            <Row>
                                                <Col md={1}>
                                                    <Form.Check type="radio" aria-label="radio 1" id="custom-switch" value={item._id} onChange={e => handleChange(e, 'paymentId')} checked={checked} />
                                                </Col>
                                                <Col md={11}>
                                                    <p className='CartText'>Pay with debit/ credit cards</p>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body>
                                        <PaymentBlockR />
                                        <div className="d-grid  mx-auto">
                                            <Link className="btn LoginBtn text-white" onClick={selectpaymentmethod}>Use this payment method</Link>
                                        </div>
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

export default PaymentPage;