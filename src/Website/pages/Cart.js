import React, { useState, useEffect } from 'react';
import { Row, Col, Card , Container } from 'react-bootstrap';
import CartBlockL from '../component/CartBlockL';
import CartBlockR from '../component/CartBlockR';
import AlertBox from '../../components/AlertBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {

    const [cartlist, setCartList] = useState([]);
    const [amount, setAmount] = useState(0);
    const [totalamount, setTotalAmount] = useState(0);
    const [discountprice, setDiscountPrice] = useState(0);
    const [numofproduct, setNumOfProduct] = useState(0);

    const getcartlist = () => {

        if (localStorage.getItem('cartlist') && !localStorage.getItem('cartlist') == "") {
            const cartlist = JSON.parse(localStorage.getItem('cartlist'));
            setCartList(cartlist);
        }
    }

    const gettotalprice = () => {

        const cartlist = JSON.parse(localStorage.getItem('cartlist'));
        if (cartlist) {
            var price = 0;
            var discount = 0;
            for (let i in cartlist) {
             
                price += cartlist[i].MRP;
                discount += cartlist[i].discount;
                setDiscountPrice(discount);
                setNumOfProduct(cartlist.length);
                setAmount(price);
                setTotalAmount(price - discount)
         
            }
 
            let data = { amount: price, discount: discount, couponDiscount: 0, totalAmount: price - discount };

            localStorage.setItem("purchaseData", JSON.stringify(data));
        }
    }

    useEffect(() => {

        getcartlist();
        gettotalprice();

    }, []);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={8}>
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body className='p-4'>
                                <p className='HomeblockCartBodyH1'>Shopping Cart</p>
                                <hr></hr>
                                <CartBlockL cartlist={cartlist} getcartlist={getcartlist} gettotalprice={gettotalprice }/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body>
                                        <p className='HomeblockCartBodyH1'>Price Details</p>
                                        <hr></hr>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductH '>Price ({numofproduct} item)</p>
                                            </Col>
                                            <Col md={6} >
                                                <p className='ProductH text-end '><span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{amount} </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <p className='ProductH '>Discount</p>
                                            </Col>
                                            <Col md={6} >
                                                <p className='ProductH text-end '>-&nbsp; <span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' /></span> {discountprice}</p>
                                            </Col>
                                        </Row>
                                        <CartBlockR totalamount={totalamount} />
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

export default Cart;