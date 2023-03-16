import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import image06 from "../../images/image 8.png";
function RelatedProduct() {

    return (
        <div className="RelatedProduct">
            <Row className='mt-3 mb-3'>
                <Col md={12}>
                    <p className='HomeblockCartBodyH1 text-center'>Related Products</p>
                    <Row>
                        <Col md={3}>
                            <Card className='ProductCard mb-2'>
                                <Link className='' to="/productdetails"><img src={image06} className="card-img-top ProductImg" alt="..." /></Link>
                                <div>
                                    <span className="btn btn-outline-dark border-1 RelatedPrStarPos">4.2 &nbsp;<FontAwesomeIcon icon={faStar} className="text-warning" /></span>
                                </div>
                                <Card.Body>
                                    <p className='ProductH'>Mish</p>
                                    <p className='ProductPrice'>Cut-Out Georgette Sheath Dress</p>
                                    <p className='ProductH'>$99.00 <del className='ProductPrice'>$139.00</del> <span className='text-success'>30% off</span></p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className='ProductCard'>
                                <Link className='' to="/productdetails"><img src={image06} className="card-img-top ProductImg" alt="..." /></Link>
                                <div>
                                    <span className="btn btn-outline-dark border-1 RelatedPrStarPos">4.2 &nbsp;<FontAwesomeIcon icon={faStar} className="text-warning" /></span>
                                </div>
                                <Card.Body>
                                    <p className='ProductH'>Mish</p>
                                    <p className='ProductPrice'>Cut-Out Georgette Sheath Dress</p>
                                    <p className='ProductH'>$99.00 <del className='ProductPrice'>$139.00</del> <span className='text-success'>30% off</span></p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className='ProductCard'>
                                <Link className='' to="/productdetails"><img src={image06} className="card-img-top ProductImg" alt="..." /></Link>
                                <div>
                                    <span className="btn btn-outline-dark border-1 RelatedPrStarPos">4.2 &nbsp;<FontAwesomeIcon icon={faStar} className="text-warning" /></span>
                                </div>
                                <Card.Body>
                                    <p className='ProductH'>Mish</p>
                                    <p className='ProductPrice'>Cut-Out Georgette Sheath Dress</p>
                                    <p className='ProductH'>$99.00 <del className='ProductPrice'>$139.00</del> <span className='text-success'>30% off</span></p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className='ProductCard'>
                                <Link className='' to="/productdetails"><img src={image06} className="card-img-top ProductImg" alt="..." /></Link>
                                <div>
                                    <span className="btn btn-outline-dark border-1 RelatedPrStarPos">4.2 &nbsp;<FontAwesomeIcon icon={faStar} className="text-warning" /></span>
                                </div>
                                <Card.Body>
                                    <p className='ProductH'>Mish</p>
                                    <p className='ProductPrice'>Cut-Out Georgette Sheath Dress</p>
                                    <p className='ProductH'>$99.00 <del className='ProductPrice'>$139.00</del> <span className='text-success'>30% off</span></p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default RelatedProduct;