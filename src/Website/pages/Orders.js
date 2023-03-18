import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { setAlert } from '../../slices/home';
import { getOrderAction } from "../../action/Front.action";
import { imgPath } from "../../common/Function";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Orders = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orderlist, setOrderList] = useState({});
    const [numberofproduct, setNumberOfProduct] = useState(0);
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({});

    const getOrdersList = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await getOrderAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            // console.log(resp);
            // setOrderList(resp.data);
            setOrderList(resp.data);
            setNumberOfProduct(resp.count);
        }
    }

    const handleSubmit = async (event) => {


    }

    const handleChange = (name, event) => {

        let from = { ...formData };

        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

    }


    const ViewProduct = (item) => {
        localStorage.setItem("orderdetails", JSON.stringify(item));
        setTimeout(() => {
            navigate('/orderdetails');
        }, 1);
    } 

    useEffect(() => {

        getOrdersList();

    }, []);


    return (
        <>
        <Row className='mb-3'>
            <Col md={4}>
                <p className=''> {numberofproduct} Orders placed </p>
            </Col>
            <Col md={8}>
                <Row className="justify-content-end">
                    <Col md={9}>
                            <div className="mb-3">
                                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="" value={formData.couponName ? formData.couponName : ""} className="form-control" onChange={e => handleChange('couponName', e)} required autoComplete="off" />

                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Code.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <span className="magnifyingGlass"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                                </Form>
                            </div>
                    </Col>
                    <Col md={3}>
                        <div className="d-grid col-12 mx-auto">
                            <Link className="btn wishListBtn text-white" to="#" type="submit">Search orders</Link>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        {
            orderlist.length > 0 &&  orderlist.map((item, ind) => {
                // console.log(item);
                let products = item.products[0].productId;
                return <Fragment key={ind}>
                    <Card className='ordersCard mb-3'>
                        <Row className='ordersCard'>
                            <Card.Body className='p-4'>
                                <Row>
                                    <Col md={2}>
                                        <p>Ship To</p>
                                        <span className='breadcrumbCS'>{item.addresses.name}</span>
                                    </Col>
                                    <Col md={2}>
                                        <p>Order</p>
                                        <span className='breadcrumbCS'># 406-3874610-5872363</span>
                                    </Col>
                                    <Col md={8}>
                                        <p>Order</p>
                                        <span className='breadcrumbCS'>{item.addresses.name}</span>
                                    </Col>
                                </Row>
                           
                            </Card.Body>
                        </Row>
                        <Row className='ordersCard1'>
                            <Card.Body className='p-5'>
                                <Row>
                                    <Col md={2}>
                                        <img src={imgPath(products.image[0])} className="card-img-top OrderProductImg" alt="..." />
                                    </Col>
                                    <Col md={10}>
                                        <Row>
                                            <Col md={6}>
                                                <span className='ProductH'>{products.name}</span><br></br>
                                                <span className='breadcrumbCS'>Size : M</span><br></br>
                                                <span className='breadcrumbCS'>Color : Green</span><br></br>
                                                <span className='breadcrumbCS'>Return window closed on 30 Jan 2023</span>
                                                <Row className='mt-3'>
                                                    <Col md={4} lg={5}>
                                                        <div className="d-grid col-12 mx-auto">
                                                            <Link className="btn wishListBtn text-white" to="#" type="submit">Buy it again</Link>
                                                        </div>
                                                    </Col>
                                                    <Col md={4} lg={5}>
                                                        <div className="d-grid col-12 mx-auto">
                                                            <Link className="btn wishListBtn text-white" to="#" onClick={e => ViewProduct(item)}>View order details</Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={2}>
                                                <p className='ProductH'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;{item.grandTotalPrice}</p>
                                            </Col>
                                            <Col md={4}>
                                                <p className='ProductH'>Expected delivery on 2 Feb 2023</p>
                                                <p className='breadcrumbCS'>Your item has been delivered</p>
                                                {/* {moment(item.createdAt).format('DD-MMM-YYYY')} */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Row>
                    </Card>
                </Fragment>
            })
        }
            
        </>
    );
}

export default Orders;