import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import AlertBox from "../../components/AlertBox";
import PaymentBlockL from '../component/PaymentBlockL';
import PaymentBlockR from '../component/PaymentBlockR';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { paymentModeListAction, orderPlacedListAction } from "../../action/Front.action";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';

const PaymentPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [paymentmethod, setPaymentMethod] = useState({});

    const getAddressList = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await paymentModeListAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            // console.log(resp.data);
            setPaymentMethod(resp.data);
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

    const selectpaymentmethod = async () => {

        if (localStorage.loginType === 'user' && localStorage.userType) {
            if (formData.paymentId) {

                let paymentID = formData.paymentId;
                localStorage.setItem('paymentID', JSON.stringify(paymentID));

                let userAddressID = JSON.parse(localStorage.getItem('userAddressID'));
                const purchaseData = JSON.parse(localStorage.getItem('purchaseData'))
                let couponDiscount = purchaseData.couponDiscount;
                const cartlist = JSON.parse(localStorage.getItem('cartlist'));
                var productdata = [];
                for (let i in cartlist) {
                    let row = cartlist[i];
                    productdata.push({ productId: row._id, quantity: row.productqyt, sizeId: row.sizeId, colorId: row.colorId  });
                }
                let data = { addressId: userAddressID, paymentId: paymentID, couponDiscount: couponDiscount, productData: productdata  };
                let resp = await orderPlacedListAction(data);
                if (resp.code === 200) {
                    dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
                    setTimeout(() => {
                        navigate('/orderplaced');
                    }, 500);
                }
            } else {
                dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Payment Method", type: '' }));
            }
        } else {

        }
    }

    useEffect(() => {

        getAddressList();

        if (localStorage.getItem('userAddressID')){ }else{
            navigate('/');
        }
        
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
                                    paymentmethod && paymentmethod.length > 0 && paymentmethod.map((item, ind) => {
                                        // console.log(item);
                                        let checked = (formData.paymentId && formData.paymentId === item._id) ? true : false;
                                        return <Fragment key={ind}>
                                            <Row>
                                                <Col md={1}>
                                                    <Form.Check type="radio" aria-label="radio 1" id="custom-switch" value={item._id} onChange={e => handleChange(e, 'paymentId')} checked={checked} />
                                                </Col>
                                                <Col md={11}>
                                                    <p className='CartText'>{item.name}</p>
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