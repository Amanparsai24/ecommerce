import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';

const PaymentBlockR = () => {

    let purchaseData = JSON.parse(localStorage.getItem('purchaseData'));
    // console.log(purchaseData);
    return (
        <>
            <p className='HomeblockCartBodyH1'>Order Summary</p>
            <hr></hr>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Items</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '><span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{purchaseData?purchaseData.amount:0}</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Discount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>- <span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{purchaseData?purchaseData.discount:0}</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductH '>Coupon Discount</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '>-<span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{purchaseData?purchaseData.couponDiscount:0}</p>
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
                    <p className='ProductH '>Order Total</p>
                </Col>
                <Col md={6} >
                    <p className='ProductH text-end '><span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{purchaseData?purchaseData.totalAmount:0}</p>
                </Col>
            </Row>
        </>
    );
}

export default PaymentBlockR;