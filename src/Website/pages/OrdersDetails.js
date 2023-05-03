import React, { useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { imgPath } from "../../common/Function";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const OrdersDetails = () => {

    const [formData, setFormData] = useState(() => {
        const orderdetails = JSON.parse(localStorage.getItem('orderdetails'));
        // console.log(orderdetails);
        return orderdetails || null;
    });

    return (
        <>
            <Row className='mt-3 mb-3 justify-content-center'>
                <Col md={12} lg={11}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/profile" className='breadcrumbCS'>My account</Link></li>
                            <li className="breadcrumb-item"><Link to="/myorders" className='breadcrumbCS'>My Orders</Link></li>
                            <li className="breadcrumb-item  active" aria-current="page">Order Details</li>
                        </ol>
                    </nav>
                    <Row className='mb-3'>
                        <p> Order Details </p>
                        <Card className='ProductFullCard mb-4'>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <p className='ProductName'>Delivery address</p>
                                        <p className='ProductPrice'>{formData.shippingAddress.name}</p>
                                        <p className='ProductPrice'>{formData.shippingAddress.houseNumber }, { formData.shippingAddress.streetAddess }</p>
                                        <p className='ProductPrice'>{formData.shippingAddress.city}, {formData.shippingAddress.state}, {formData.shippingAddress.pinCode},{formData.shippingAddress.country}</p>
                                        <p className='ProductPrice'><b>Phone Number:</b> {formData.shippingAddress.phoneNumber}</p>

                                    </Col>
                                    <Col md={4}>
                                        <p className='ProductName'>Payment Method</p>
                                        <p className='ProductPrice'>{formData.paymentModeId.name}</p>
                                    </Col>
                                    <Col md={4}>
                                        <p className='ProductName'>Order summary</p>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductPrice'>Items</p>
                                            </Col>
                                            <Col md={6}>
                                                <p className='ProductPrice text-end'><span className='ProductPrice'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{formData.products[0].productPriceDetails.price}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductPrice'>Discount</p>

                                            </Col>
                                            <Col md={6}>
                                                <p className='ProductPrice text-end'>-<span className='ProductPrice'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span> {formData.products[0].productPriceDetails.discount}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductPrice'>Coupon Discount</p>

                                            </Col>
                                            <Col md={6}>
                                                <p className='ProductPrice text-end'>- <span className='ProductPrice'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{formData.couponDiscount}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductPrice'>Delivery</p>

                                            </Col>
                                            <Col md={6}>
                                                <p className='ProductPrice text-end'>-<span className='ProductPrice'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>0</p>
                                            </Col>
                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductName'>Order Total</p>

                                            </Col>
                                            <Col md={6}>
                                                <p className='ProductName text-end'><span className='ProductPrice'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{formData.products[0].productPriceDetails.totalPrice}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Link className="btn text-dark" to="#" type="submit">Download Invoice</Link>
                            </Card.Body>
                        </Card>
                        <Card className='ProductFullCard'>
                            <Card.Body>
                                <p className='ProductName'>Delivered on {moment(formData.createdAt).format('Do MMM YYYY')}</p>
                                <p className='ProductPrice'> Your item has been delivered </p>
                                <Row>
                                    <Col md={2}>
                                        <img src={imgPath(formData.products[0].productId.image[0])} className="card-img-top OrderProductImg" alt="..." />
                                    </Col>
                                    <Col md={10}>
                                        <Row>
                                            <Col md={6}>
                                                <span className='ProductH'>{formData.products[0].productId.name}</span><br></br>
                                                <span className='breadcrumbCS'>Size : {formData.products[0].sizeId.name}</span><br></br>
                                                <span className='breadcrumbCS'>Color : {formData.products[0].colorId.name}</span><br></br>
                                               <span className='ProductPrice'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;{formData.products[0].productId.MRP} </span><br></br>
                                                <Row className='mt-3'>
                                                    <Col md={4} lg={5}>
                                                        <div className="d-grid col-12 mx-auto">
                                                            <Link className="btn wishListBtn text-white" to="#" type="submit">Buy it again</Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
               
            </Row>
        </>
    );
}

export default OrdersDetails;