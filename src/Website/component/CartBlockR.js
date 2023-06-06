import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CouponModel from "./CouponModel";
import LoginModel from "./LoginModel";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const CartBlockR = ({ numofproduct }) => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [userloged, setUserLoged] = useState(0);

    let purchaseData = JSON.parse(localStorage.getItem('purchaseData'));

    let cartlist = JSON.parse(localStorage.getItem('cartlist'));
    const cartItem = useSelector((state) => state.home.cartNumber);
    let cartnum;
    if (!cartlist) {
        cartnum = 0;
    } else {
        if (cartlist.length === cartItem) {
            cartnum = cartItem;
        } else {
            cartnum = cartlist.length;
        }
    }

    const applyCoupon = () => {
        setUserLoged(0);
        handleShow();
    }

    const buyProduct = () => {
        if (localStorage.loginType === 'user' && localStorage.userType) {
            setTimeout(() => {
                navigate('/address');
            }, 500);
        } else {
            setUserLoged(1);
            handleShow();
        }
    }

    return (
        <>
            <Row>
                <Col sm={12} md={6}>
                    <p className='ProductH '>Price ({cartnum} item)</p>
                </Col>
                <Col sm={12} md={6} >
                    <p className='ProductH text-end_Res '><span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{purchaseData ? purchaseData.amount : 0}  </p>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6}>
                    <p className='ProductH '>Discount</p>
                </Col>
                <Col sm={12} md={6} >
                    <p className='ProductH text-end_Res '>-&nbsp; <span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' /></span> {purchaseData ? purchaseData.discount : 0} </p>
                    {/* {discountprice} */}
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6}>
                    <p className='ProductH '>Coupon Discount                
                        <small> {purchaseData ? purchaseData.couponName : 0}</small>
                    </p>
                </Col>
                <Col sm={12} md={6} >
                    <p className='ProductH text-end_Res '><Link className='text-decoration-none' onClick={applyCoupon}>Apply Coupon</Link></p>
                    <Modal show={show} size="lg" onHide={handleClose}>
                        {
                            userloged === 1 ?

                                <LoginModel />

                                :

                                <CouponModel handleClose={e => handleClose()} />
                        }
                    </Modal>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6}>
                    <p className='ProductH '>Delivery charges</p>
                </Col>
                <Col sm={12} md={6} >
                    <p className='ProductH text-end_Res '>Free</p>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Total Amount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end_Res'><span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{purchaseData ? purchaseData.totalAmount : 0}</p>
                    {/* {totalamount} */}
                </Col>
            </Row>
            <div className="d-grid  mx-auto">
                <Link className="btn LoginBtn text-white" onClick={buyProduct}>Proceed to Buy</Link>
            </div>
        </>
    );
}

export default CartBlockR;