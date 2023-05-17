import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, ProgressBar, Button } from 'react-bootstrap';
import { setAlert } from '../../slices/home';
import { getOrderAction } from "../../action/Front.action";
import { imgPath } from "../../common/Function";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faIndianRupeeSign, faDownload } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../components/Pagination';
import { Year } from "../../common/Constant";
import moment from 'moment';
import Invoice from './Invoice';

const Orders = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orderlist, setOrderList] = useState({});
    const [numberofproduct, setNumberOfProduct] = useState(0);
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({ page: 0, limit: 5, Year: 2023, sortName: "createdAt", soryBy: "DESC" });

    const ViewProduct = (item) => {
        // console.log(item.productId._id)
        localStorage.setItem("productDetails", JSON.stringify(item.productId));
        setTimeout(() => {
            navigate('/productdetails?a=' + item.productId._id, { state: item.productId });
        }, 1);
    }


    const getOrdersList = async (action = '') => {

        let filterData = { ...formData };

        if (action === 'clear') {
            filterData = { page: 0, limit: 5, Year: 2023, sortName: "createdAt", soryBy: "DESC" };
            setFormData(filterData);
        }

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await getOrderAction(filterData);
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
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

    const showData = (e) => {
        formHandler(e, 'Year');
    }


    const formHandler = (e, field) => {

        let data = { ...formData };
        if (e.target) {
            data[field] = e.target.value;
        } else {
            data[field] = e;
        }
        setFormData(data);
    }


    useEffect(() => {

        getOrdersList();

    }, []);

    return (
        <>
            <hr></hr>
            <Row className='mb-3'>
                <Col md={4}>
                    <Row className="justify-content-start">
                        <Col md={4}>
                            <span> <b>{numberofproduct} Orders</b> placed </span>
                        </Col>
                        <Col md={4} className="">
                            <select className="form-select filedbg " aria-label="Default select example" onChange={e => showData(e,)} value={formData.Year ? formData.Year : ""} >
                                <option>{formData.Year}</option>
                                {Year.map((filedbg) => {
                                    return <option value={filedbg} key={filedbg}> {filedbg} </option>
                                })}
                            </select>
                        </Col>
                    </Row>
                </Col>

                <Col md={8}>
                    <Row className="justify-content-end">
                        <Col md={9}>
                            <div className="mb-3">
                                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="" value={formData.name ? formData.name : ""} className="form-control" onChange={e => formHandler(e, 'name')} required autoComplete="off" />
                                        {/* <input type="date" className="form-control filedbg" id="exampleFormControlInput1" placeholder="e.g. 09-09-2021" value={formData.startDate ? formData.startDate : ""} onChange={e => formHandler(e, 'startDate')} /> */}
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
                                <Link className="btn wishListBtn text-white" to="#" type="button" onClick={e => getOrdersList()}>Search orders</Link>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {
                orderlist.length > 0 && orderlist.map((item, ind) => {
                    let totalprice = item.grandTotalPrice;
                    let dates = item.products[0].shippingDateDetails;
                    return <Fragment key={ind}>
                        <Card className='ordersCardnew mb-4'>
                            <Card.Body className='ordersCard p-4'>
                                <Row>
                                    <Col md={2}>
                                        <p>Ship To</p>
                                        <span className='breadcrumbCS'>{item.shippingAddress.name}</span>
                                    </Col>
                                    <Col md={3}>
                                        <p>Order</p>
                                        <span className='breadcrumbCS'>{item._id}</span>
                                    </Col>
                                    <Col md={6}>
                                        <ProgressBar className='progress_res'>
                                            <ProgressBar className='color' now={25} label={`Order Confirmed ${moment(item.createdAt).format('Do MMM YYYY')}`} key={1} />
                                            <ProgressBar className='colorNew' now={25} label={`Shipped ${moment(dates.shippedDate).format('Do MMM YYYY')}`} key={2} />
                                            <ProgressBar className='colorNew' now={25} label={`Out of Delivery ${moment(dates.outOfDeliveryDate).format('Do MMM YYYY')}`} key={3} />
                                            <ProgressBar className='colorNew' now={25} label={`Delivered ${moment(dates.deliveredDate).format('Do MMM YYYY')}`} key={4} />
                                        </ProgressBar>
                                    </Col>
                                    <Col md={1}>
                                        <Invoice item={item} />
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Body className='p-4' >
                                {
                                    item.products.length > 0 && item.products.map((item, ind) => {
                                        // console.log(item)
                                        return <Fragment key={ind}>
                                                <Row className='mb-4'>
                                                    <Col md={2}>
                                                    <img src={imgPath(item.image)} className="card-img-top OrderProductImg" alt="..." />
                                                    </Col>
                                                    <Col md={10}>
                                                        <Row>
                                                            <Col md={6}>
                                                                <span className='ProductH'>{item.productId.name}</span><br></br>
                                                                <span className='breadcrumbCS'>Size : {item.sizeId.name}</span><br></br>
                                                                <span className='breadcrumbCS'>Color : {item.colorId.name}</span><br></br>
                                                                <span className='breadcrumbCS'>Return window closed on {moment(dates.returnDate
                                                                ).format('Do MMM YYYY')}</span>
                                                                <Row className='mt-3'>
                                                                    <Col md={4} lg={5}>
                                                                        <div className="d-grid col-12 mx-auto">
                                                                            {/* <Link className="btn wishListBtn text-white" to="#" type="submit">Buy it again</Link> */}
                                                                        <Button className='wishListBtn text-white border-0' onClick={e => ViewProduct(item)}>
                                                                                Buy it again
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                    {/* <Col md={4} lg={5}>
                                                                        <div className="d-grid col-12 mx-auto">
                                                                            <Link className="btn wishListBtn text-white" to="#">View order details</Link>
                                                                        </div>
                                                                    </Col> */}
                                                                </Row>
                                                            </Col>
                                                            <Col md={2}>
                                                            <p className='ProductH'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;{item.productPriceDetails.totalPrice}</p>
                                                            </Col>
                                                            <Col md={4}>
                                                                <p className='ProductH'>Expected delivery on {moment(dates.deliveredDate
                                                                ).format('Do MMM YYYY')}</p>
                                                                <p className='breadcrumbCS'>Your item has been delivered</p>
                                                                {/* {moment(item.createdAt).format('DD-MMM-YYYY')} */}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                        </Fragment>
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Fragment>
                })
            }
            <Col lg={12}>
                <Pagination
                    totalCount={numberofproduct}
                    formData={formData}
                    formHandler={formHandler}
                    setFormData={setFormData}
                />
            </Col>
        </>
    );
}

export default Orders;