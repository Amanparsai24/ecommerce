import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { imgPath } from "../../common/Function";
import { Link } from 'react-router-dom';
import moment from 'moment';

const OrdersDetails = () => {

    const [formData, setFormData] = useState(() => {
        const orderdetails = JSON.parse(localStorage.getItem('orderdetails'));
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
                        <Col md={4}>
                            <p className=''> Order Details </p>
                        </Col>
                    </Row>
                </Col>
               
            </Row>
        </>
    );
}

export default OrdersDetails;