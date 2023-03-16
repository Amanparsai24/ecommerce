import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { useLocation } from "react-router-dom";
import { setAlert } from '../../slices/home';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faShoppingCart, faBolt,  } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { imgPath } from "../../common/Function";
import { QuantityPicker } from 'react-qty-picker';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import AlertBox from "../../components/AlertBox";
import RelatedProduct from "./RelatedProduct";
import ProductDescription from "./ProductDescription";
import CustomerReviews from "./CustomerReviews";
import Delivery from "./Delivery";
import Offers from "./Offers";
import Rating from '../component/Rating';
import Color from '../component/Color';
import Size from '../component/Size';

const ProductDetails = () => {

    const { state } = useLocation();
    const [formData, setFormData] = useState(state);
    const dispatch = useDispatch();
    const [productID, setproductID] = useState([]);
    const [productqyt, setProductQYT] = useState(1);

    const addtoCart = (data) => {
        var cartData;
        //   we chech here if there is data on cartlist or not
        if (localStorage.getItem('cartlist') === null) {
            cartData = [];
        } else {
            //   if there is  data on cartlist we set in carddata
            cartData = JSON.parse(localStorage.getItem('cartlist'));
        }
        //   here we know card is empty we added new data on it
        data['productqyt'] = 1;
        cartData.push(data);
        localStorage.setItem('cartlist', JSON.stringify(cartData));
        dispatch(setAlert({ open: true, severity: "success", msg: 'Product added to cart ', type: '' }));
        var newdata = JSON.parse(localStorage.getItem('cartlist'));
        for (let i in newdata) {
            if (newdata[i]._id === state._id) {
                let id = newdata[i]._id;
                setproductID(id);
            }
        }
        // here we check for multiple data in cartlist in match with current page data

    }

    // console.log(formData);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={5}>
                        <Card className='ProductDetailsImgCard mb-2'>
                            <Row>
                                <Col md={2}>
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                </Col>
                                <Col md={10}>
                                    <img src={imgPath(formData ? formData.image[0]:"")} className="card-img-top ProductDetailsImg" alt="..." />
                                    <span className="btn text-dark ProductDetailsheartPos"><FontAwesomeIcon icon={faHeart} /></span>
                                    <span className="btn text-dark ProductDetailsSharePos"><FontAwesomeIcon icon={faShareNodes} /></span>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col md={4} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        {

                                            productID === formData._id  ?
                                                <>
                                                    <Link className="btn LoginBtn text-white" type="button" to="/cart" >View Cart</Link>
                                                </>
                                                :
                                                <>
                                                    <Link className="btn LoginBtn text-white" type="button" to="#" onClick={e => addtoCart(formData)}><FontAwesomeIcon icon={faShoppingCart} />{' '}Add to cart</Link>
                                                </>

                                        }
                                
                                    </div>
                                </Col>
                                <Col md={4} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        <button className="btn LoginBtn text-white " type="button"><FontAwesomeIcon icon={faBolt} />{' '}Buy Now</button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductCard mb-2'>
                                    <Card.Body>
                                        <p className='ProductH'>{formData?formData.brand.name:""}</p>
                                        <p className='ProductPrice'>{formData?formData.name:""}</p>

                                        <Rating />

                                        <p className='ProductH'>${formData ? formData.salePrice : ""}&nbsp; <del className='ProductPrice'>${formData ? formData.MRP : ""} </del> <span className='text-warning'> &nbsp; {formData.offers}% off</span></p>
                                        <div className='Textsm'>{formData ?formData.description:""} </div>
                                        <hr></hr>
                                        <Row>
                                            <Col md={4} lg={4}>
                                                <Size />
                                            </Col>
                                            <Col md={4} lg={6}>
                                                <Color />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4} lg={4}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Quantity :</label>
                                                    <div className='quantityUpdate'>
                                                        <QuantityPicker min={1} value={productqyt} />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Offers />
                                        <hr></hr>
                                        <Delivery />
                                        <hr></hr>
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                            <Row>
                                                <Col sm={8}>
                                                    <Nav variant="pills" >
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="first">Product Description</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="second">Customer Reviews</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Col>
                                                <Col sm={8} className="mt-3">
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">
                                                            <ProductDescription properties={formData.properties} />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="second">
                                                            <CustomerReviews  />
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr></hr>
                <RelatedProduct />
            </Container>
        </div>
    );
}

export default ProductDetails;