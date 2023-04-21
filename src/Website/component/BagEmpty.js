import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { imgPath } from "../../common/Function";

const BagEmpty = ({ wishlistproduct }) => {

    return (
       <>
            <h4 className='text-center ProductH'>Your Shopping Bag is Empty!!</h4>
            {
                wishlistproduct.length > 0 &&
                <>
                    <Row>
                        <h6 className='mb-4 text-center ProductH'>You have items in your wishlist waiting to be yours!</h6>
                        {wishlistproduct && wishlistproduct.length > 0 && wishlistproduct.map((item, ind) => {
                            // console.log(item);
                            return <Col xs={12} md={12} lg={4} >
                                <Card className='ProductCard mb-2' key={ind} >
                                    <img src={imgPath(item.productId ? item.productId.image[0] : "")} className="card-img-top ProductImg" alt="..." />
                                    <Card.Body>
                                        <p className='ProductH'> {item.productId ? item.productId.name : ""}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        })
                        }
                    </Row>
                    <Link to="/wishlist" className="btn btn-outline-warning mt-1">ADD FROM WISHLIST</Link>
                </>
            }
            <Row className='justify-content-center'>
                <Col md={3}>
                    <div className="d-grid  mx-auto">
                        <Link className="btn LoginBtn text-white mt-3" to="/product">CONTINUE SHOPPING</Link>
                    </div>
                </Col>
            </Row>
       </>
    );
}

export default BagEmpty;