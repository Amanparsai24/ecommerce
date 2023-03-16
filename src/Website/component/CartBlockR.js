import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CouponModel from "../component/CouponModel";
import LoginModel from "../component/LoginModel";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const CartBlockR = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [amount, setAmount] = useState(0);
    const [totalamount, setTotalAmount] = useState(0);
    const [discountprice, setDiscountPrice] = useState(0);
    const [userloged, setUserLoged] = useState(0);
    const [numofproduct, setNumOfProduct] = useState(0);


    let purchaseData = JSON.parse(localStorage.getItem('purchaseData'));
    // console.log(purchaseData[0].couponName);

    const gettotalprice = () => {
    
        const cartlist = JSON.parse(localStorage.getItem('cartlist'));
        if (cartlist) {
            var price = 0;
            var discount = 0;
            for (let i in cartlist) {
                if (cartlist[i].updatedprice) {
                    price += cartlist[i].updatedprice;
                } else {
                    price += cartlist[i].MRP;
                }

                discount += cartlist[i].discount;
                setDiscountPrice(discount);
                setNumOfProduct(cartlist.length);
                setAmount(price);
                setTotalAmount(price - discount)
            }
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

    useEffect(() => {

        gettotalprice();

    }, []);


    return (
        <>
            <p className='HomeblockCartBodyH1'>Price Details</p>
            <hr></hr>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Price ({numofproduct} item)</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>$ {amount} </p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Discount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>- {discountprice}</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    {
                        purchaseData ?
                            <p className='ProductH '>{purchaseData ? purchaseData.couponName : ""}</p>
                            :
                            <p className='ProductH '>Coupon Discount</p>
                    }

                </Col>
                <Col md={6} >
                    {
                        purchaseData ?
                            <p className='ProductH text-end '>- {purchaseData ? purchaseData.discountAmount : 0}</p>
                            :
                            <p className='ProductH text-end '><Link className='text-decoration-none' onClick={applyCoupon}>Apply Coupon</Link></p>
                    }

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
                <Col md={6}>
                    <p className='ProductH '>Delivery charges</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>Free</p>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Total Amount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>{purchaseData ? purchaseData.subTotelPrice : totalamount}</p>
                </Col>
            </Row>
            <div className="d-grid  mx-auto">
                <Link className="btn LoginBtn text-white" onClick={buyProduct}>Proceed to Buy</Link>
            </div>
        </>
    );
}

export default CartBlockR;