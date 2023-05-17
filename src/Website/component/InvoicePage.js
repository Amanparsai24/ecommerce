import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Logo from "../../images/Logo.png";


const InvoicePage = ({ item }) => {

    const [formData, setFormData] = useState(() => {
        const orderdetails = JSON.parse(localStorage.getItem('orderdetails'));
        return orderdetails || null;
    });
    var Productinfo = item.products;
    var price = 0;
    for (let i in Productinfo) {
        price += Productinfo[i].productPriceDetails.totalPrice;
    }

    let couponDiscount = item.couponDiscount;
    let totalPrice = price - couponDiscount;
    return (
        <Container className='p-4'>
            <Row>
                <Col lg={6}>
                    <img src={Logo} className="img-fluid logoImg" alt="..." />
                </Col>
                <Col lg={6} className='float-left'>
                    <p className='TaxInvoice'>Tax Invoice</p>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col lg={6}>
                    <Row>
                        <Col md={6}>
                            <p className='Invoicef20'>Invoice Number</p>
                        </Col>
                        <Col md={6}>
                            <p className='Invoicef16 mt-1 text-start'>BOM7-3385044</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <p className='Invoicef20'>Order Number</p>
                        </Col>
                        <Col md={6}>
                            <p className='Invoicef16 mt-1 text-start'>000000000000</p>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                        <Col md={6}>
                            <p className='Invoicef20'>Invoice date</p>
                        </Col>
                        <Col md={6}>
                            <p className='Invoicef16 mt-1'>{moment(item.createdAt).format('Do MMM YYYY')}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <p className='Invoicef20'>Order date</p>
                        </Col>
                        <Col md={6}>
                            <p className='Invoicef16 mt-1'>{moment(item.createdAt).format('Do MMM YYYY')}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr></hr>
            <Row className='mb-3'>
                <Col lg={6}>
                    <span className='Invoicef22'>Sold By</span><br />
                    <span className='Invoicef20'>Appario Retail Private Ltd</span>
                    <span className='Invoicef20'>Building No. 5, BGR Warehousing Complex,</span>
                    <span className='Invoicef20'>Near Shiv Sagar Hotel, Village Vahuli, Bhiwandi,Thane</span>
                    <span className='Invoicef20'>BHIWANDI, MAHARASHTRA, 421302 , IN</span>
                    <span className='Invoicef20'></span>
                </Col>
                <Col lg={6} className='text-end'>
                    <span className='Invoicef22'>Shipping Address</span><br />
                    <span className='Invoicef20'>{item.shippingAddress.name}</span><br />
                    <span className='Invoicef20'>{item.shippingAddress.houseNumber}, {item.shippingAddress.streetAddess}</span><br />
                    <span className='Invoicef20'>{item.shippingAddress.pinCode} ,{item.shippingAddress.city}</span><br />
                    <span className='Invoicef20'>{item.shippingAddress.state},{''} {item.shippingAddress.country}</span>
                </Col>
            </Row>
            <hr></hr>
            <Row className='mb-3'>
                <Col lg={6}>
                    <Row>
                        <Col md={5}>
                            <span className='Invoicef20'>GST Number</span>
                        </Col>
                        <Col md={7}>
                            <span className='Invoicef16 mt-1  text-start'>BOM7-3385044</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <span className='Invoicef20'>PAN Number</span>
                        </Col>
                        <Col md={7}>
                            <span className='Invoicef16 mt-1  text-start'>BOM7-3385044</span>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                        {/* <Col md={6}>
                            <span className='Invoicef20'>Transaction ID</span>
                        </Col>
                        <Col md={6}>
                            <span className='Invoicef16 mt-1  text-start'>{item.paymentModeId._id}</span>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col md={6}>
                            <span className='Invoicef20'>Payment Mode</span>
                        </Col>
                        <Col md={6}>
                            <span className='Invoicef16 mt-1'>{item.paymentModeId.name}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Card>
                <Card.Body>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th className='Invoicef18' scope="col">Product</th>
                                <th className='Invoicef18' scope="col">Price</th>
                                <th className='Invoicef18' scope="col">Discount</th>
                                <th className='Invoicef18' scope="col">Qty</th>
                                <th className='Invoicef18' scope="col">Total amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.products.length > 0 && item.products.map((item, ind) => {
                                    // let grandTotalPrice = item.grandTotalPrice;
                                    // console.log(item);
                                    return <Fragment key={ind}>
                                        <tr className='border-bottom'>
                                            <td className='Invoicef16'>{item.productId.name}</td>
                                            <td className='Invoicef16'>{item.productPriceDetails.price}</td>
                                            <td className='Invoicef16'>{item.productPriceDetails.discount}</td>
                                            <th className='Invoicef16'>{item.productPriceDetails.quantity}</th>
                                            <td className='Invoicef16'>{item.productPriceDetails.totalPrice}</td>
                                        </tr>
                                    </Fragment>
                                })

                            }
                            <tr>
                                <td className='Invoicef22bold' colSpan={4}>Sub Total</td>
                                <td className='Invoicef16'>{price}</td>
                            </tr>
                            <tr>
                                <td className='Invoicef22bold' colSpan={4}>Coupon Discount</td>
                                <td className='Invoicef16'>{couponDiscount}</td>
                            </tr>
                            <tr className='border-bottom'>
                                <td className='Invoicef22bold' colSpan={4}>Shipping Charges</td>
                                <td className='Invoicef16'>0</td>
                            </tr>
                            <tr>
                                <td className='Invoicef22bold' colSpan={4}>Total</td>
                                <td className='Invoicef16'>{totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InvoicePage;