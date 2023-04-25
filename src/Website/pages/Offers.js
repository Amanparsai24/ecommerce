
import { Row, Col, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Offers() {
    return (
        <div className="Offers">
            <Row>
                <Col md={12} lg={12}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Offers :</label>

                        <p className='Textsm'>
                            <span className="btn text-dark"><FontAwesomeIcon icon={faTag} /></span>
                            Bank Offer 10% off on Indian Bank Mastercard Debit Cards, up to $50. On orders of $350 and above &nbsp;
                            <Link className='text-decoration-none text-dark'>T&C</Link>
                        </p>
                        <p className='Textsm'>
                            <span className="btn text-dark"><FontAwesomeIcon icon={faTag} /></span>
                            Bank Offer 5% Cashback on Flipkart Axis Bank Card &nbsp;
                            <Link className='text-decoration-none text-dark'>T&C</Link>
                        </p>
                        <p className='Textsm'>
                            <span className="btn text-dark"><FontAwesomeIcon icon={faTag} /></span>
                            now & get a surprise cashback coupon in February / March 2023  Know More &nbsp;
                            <Link className='text-decoration-none text-dark'>Know More</Link>
                        </p>
                        <Link className='text-decoration-none text-primary'>+ 1 offer</Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Offers;