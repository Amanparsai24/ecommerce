import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Logo from "../../images/Logo.png";


const InvoicePage = ({ item }) => {

    const [formData, setFormData] = useState(() => {
        const orderdetails = JSON.parse(localStorage.getItem('orderdetails'));
        return orderdetails || null;
    });
    console.log(formData);

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
                            <p className='Invoicef16 mt-1'>BOM7-3385044</p>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                        <Col md={6}>
                            <p className='Invoicef20'>Order Number</p>
                        </Col>
                        <Col md={6}>
                            <p className='Invoicef16 mt-1'>{item._id}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Row>
                        <Col md={6}>
                            <p className='Invoicef20'>Invoice date</p>
                        </Col>
                        <Col md={6}>
                            <p className='Invoicef16 mt-1'>{moment(item.createdAt).format('Do MMM YYYY')}</p>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} className='float-left'>
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
                    <p className='Invoicef22'>Sold By</p>
                    <p className='Invoicef20'>Appario Retail Private Ltd</p>
                    <p className='Invoicef20'>Building No. 5, BGR Warehousing Complex,</p>
                    <p className='Invoicef20'>Near Shiv Sagar Hotel, Village Vahuli, Bhiwandi,</p>
                    <p className='Invoicef20'>Thane</p>
                    <p className='Invoicef20'>BHIWANDI, MAHARASHTRA, 421302</p>
                    <p className='Invoicef20'>IN</p>
                </Col>
                <Col lg={6} className='float-left'>
                    <p className='Invoicef22'>Shipping Address</p>
                    <p className='Invoicef20'>{item.shippingAddress.name}</p>
                    <p className='Invoicef20'>{item.shippingAddress.houseNumber}, {item.shippingAddress.streetAddess}</p>
                    <p className='Invoicef20'>{item.shippingAddress.pinCode} ,{item.shippingAddress.city}</p>
                    <p className='Invoicef20'>{item.shippingAddress.state}</p>
                    <p className='Invoicef20'>{item.shippingAddress.country}</p>
                </Col>
            </Row>
            <hr></hr>
            <Row className='mb-3'>
                <Col lg={8}>
                    <Row>
                        <Col md={7}>
                            <p className='Invoicef20'>GST Registration Number</p>
                        </Col>
                        <Col md={5}>
                            <p className='Invoicef16 mt-1'>BOM7-3385044</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className='Invoicef20'>PAN Number</p>
                        </Col>
                        <Col md={5}>
                            <p className='Invoicef16 mt-1'>BOM7-3385044</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className='Invoicef20'>Payment transaction ID</p>
                        </Col>
                        <Col md={5}>
                            <p className='Invoicef16 mt-1'>{item.paymentModeId._id}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className='Invoicef20'>Mode of payment</p>
                        </Col>
                        <Col md={5}>
                            <p className='Invoicef16 mt-1'>{item.paymentModeId.name}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Card>
                <Card.Body>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th className='Invoicef18' scope="col">S.No.</th>
                                <th className='Invoicef18' scope="col">Product</th>
                                <th className='Invoicef18' scope="col">Unit price</th>
                                <th className='Invoicef18' scope="col">Discount</th>
                                <th className='Invoicef18' scope="col">Qty</th>
                                <th className='Invoicef18' scope="col">Net amount</th>
                                <th className='Invoicef18' scope="col">Tax rate</th>
                                <th className='Invoicef18' scope="col">Tax amount</th>
                                <th className='Invoicef18' scope="col">Total amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item.products.length > 0 && item.products.map((item, ind) => {
                                    // let grandTotalPrice = item.grandTotalPrice;
                                    // console.log(item);
                                    return <Fragment key={ind}>
                                       <tr>
                                           <th className='Invoicef16'>{ind + 1}</th>
                                           <td className='Invoicef16'>{item.productId.name}</td>
                                           <td className='Invoicef16'>{item.productPriceDetails.price}</td>
                                           <td className='Invoicef16'>{item.productPriceDetails.discount}</td>
                                           <th className='Invoicef16'>{item.productPriceDetails.quantity}</th>
                                           <td className='Invoicef16'>{item.productPriceDetails.totalPrice}</td>
                                           <td className='Invoicef16'>0</td>
                                           <td className='Invoicef16'>0</td>
                                           <td className='Invoicef16'>{item.productPriceDetails.totalPrice}</td>
                                       </tr>
                                   
                                    </Fragment> 
                                })

                            }

                       
                          <tr className='border-bottom'>
                                <th></th>
                                <th className='Invoicef16'>Shipping Charges</th>
                                <td className='Invoicef16'>1414</td>
                                <td className='Invoicef16'>Mark</td>
                                <td className='Invoicef16'>Otto</td>
                                <td className='Invoicef16'>@mdo</td>
                                <th className='Invoicef16'>1</th>
                                <td className='Invoicef16'>Mark</td>
                                <td className='Invoicef16'>Mark</td>
                            </tr>
                            <tr>
                                <th></th>
                                <th className='Invoicef16'>Total</th>
                                <td className='Invoicef16'>1414</td>
                                <td className='Invoicef16'>Mark</td>
                                <td className='Invoicef16'>Otto</td>
                                <td className='Invoicef16'>@mdo</td>
                                <th className='Invoicef16'>1</th>
                                <td className='Invoicef16'>Mark</td>
                                <td className='Invoicef16'></td>
                            </tr> 
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default InvoicePage;