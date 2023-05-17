import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { setAlert } from '../../slices/home';
import { Row, Col, Container, Card, Modal, OverlayTrigger, Tooltip , Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faShoppingCart, faBolt, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { imgPath } from "../../common/Function";
import { QuantityPicker } from 'react-qty-picker';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import AlertBox from "../../components/AlertBox";
import RelatedProduct from "./RelatedProduct";
import ProductDescription from "./ProductDescription";
import CustomerReviews from "./CustomerReviews";
import Delivery from "./Delivery";
import Offers from "./Offers";
import Rating from '../component/Rating';
import LoginModel from "../component/LoginModel";

const ProductDetailsold = (props) => {

    // console.log(window.location.search); 
    const parsed = queryString.parse(window.location.search);
    // console.log(parsed.a);
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(state);
    // const [formData, setFormData] = useState(() => {
    //     const productDetails = JSON.parse(localStorage.getItem('productDetails'));
    //     return productDetails || null;
    // });

    const [productID, setproductID] = useState([]);
    const [productqyt, setProductQYT] = useState(1);
    const [colorinfo, setColorInfo] = useState({ colorId: formData.colors[0].colorId._id, colorName: formData.colors[0].colorId.name });
    const [sizeinfo, setSizeInfo] = useState({ sizeId: formData.colors[0].sizes[0].sizeId._id, sizeName: formData.colors[0].sizes[0].sizeId.name });
    const [sizeList, setSizeList] = useState([]);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }

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
        data['colorId'] = colorinfo.colorId;
        data['colorName'] = colorinfo.colorName;
        data['sizeId'] = sizeinfo.sizeId;
        data['sizeName'] = sizeinfo.sizeName;
        data['productqyt'] = 1;
        cartData.push(data);
        localStorage.setItem('cartlist', JSON.stringify(cartData));

            dispatch(setAlert({ open: true, severity: "success", msg: 'Product added to cart ', type: '' }));
            var newdata = JSON.parse(localStorage.getItem('cartlist'));
            for (let i in newdata) {
                if (newdata[i]._id === formData._id) {
                    let id = newdata[i]._id;
                    setproductID(id);
                }
            }
        // here we check for multiple data in cartlist in match with current page data
    }

    const buyNow = (data) => {
        var cartData = [];
        data['colorId'] = colorinfo.colorId;
        data['colorName'] = colorinfo.colorName;
        data['sizeId'] = sizeinfo.sizeId;
        data['sizeName'] = sizeinfo.sizeName;
        data['productqyt'] = 1;
        cartData.push(data);
        localStorage.setItem('buyNowdata', JSON.stringify(cartData));
        localStorage.setItem('buyNow', JSON.stringify("buyNow"));
        let price = 0;
        let discount = 0;
        let sizeId;
        let colorId;
        price = data.MRP;
        discount = data.discount;
        sizeId = data.sizeId;
        colorId = data.colorId;
        let pricedetails = { amount: price, discount: discount, couponDiscount: 0, totalAmount: price - discount, sizeId: sizeId, colorId: colorId };

        localStorage.setItem("purchaseData", JSON.stringify(pricedetails));
        if (localStorage.loginType === 'user' && localStorage.userType) {
            window.location.href = "/address";
        } else {
            handleShow();
        }
    }

    const handlecolorClick = (k) =>{
        setColorInfo({ colorId: k._id, colorName: k.name  });
    }

    const handlesizeClick = (k) => {
        setSizeInfo({ sizeId: k._id, sizeName: k.name });
    }


    useEffect(() => {

        let allcolor = formData.colors;
        for (let i in allcolor) {
            if (allcolor[i].colorId._id === colorinfo.colorId) {
                let sizeid = allcolor[i].sizes;
                setSizeList(sizeid);
            }
        }

    }, []);

    // console.log(state);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col sm={12} md={5}>
                        <Card className='ProductDetailsImgCard mb-2'>
                            <Row>
                                <Col sm={12} md={2}>
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                    <img src={imgPath(formData ? formData.image[0] :"")} className="card-img-top ProductDetailsImgsm mb-2" alt="..." />
                                </Col>
                                <Col sm={12} md={10}>
                                    <img src={imgPath(formData ? formData.image[0]:"")} className="card-img-top ProductDetailsImg" alt="..." />
                                    <span className="btn text-dark ProductDetailsheartPos"><FontAwesomeIcon icon={faHeart} /></span>
                                    <span className="btn text-dark ProductDetailsSharePos"><FontAwesomeIcon icon={faShareNodes} /></span>
                                </Col>
                                
                            </Row>
                            <Row className='mt-3'>
                                <Col sm={12} md={4} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        {

                                            productID === formData._id  ?
                                                <>
                                                    <Link className="btn LoginBtn text-white mb-2" type="button" to="/cart" >View Cart</Link>
                                                </>
                                                :
                                                <>
                                                    <Button className='LoginBtn border-0 mb-2' onClick={e => addtoCart(formData)}><FontAwesomeIcon icon={faShoppingCart} />{' '}Add to cart</Button>
                                                    {/* <Link className="btn LoginBtn text-white mb-2" type="button" to="#" onClick={e => addtoCart(formData)}><FontAwesomeIcon icon={faShoppingCart} />{' '}Add to cart</Link> */}
                                                </>

                                        }
                                
                                    </div>
                                </Col>
                                <Col md={4} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        <Button className='LoginBtn border-0' onClick={e => buyNow(formData)}><FontAwesomeIcon icon={faBolt} />{' '}Buy Now</Button>
                                        {/* <Link className="btn LoginBtn text-white" type="button" onClick={e => buyNow(formData)}><FontAwesomeIcon icon={faBolt} />{' '}Buy Now</Link> */}
                                    </div>

                                    <Modal show={show} size="lg" onHide={handleClose}>
                                        <LoginModel />
                                    </Modal>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm={12} md={7}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductCard mb-2'>
                                    <Card.Body>
                                        <p className='ProductH'>{formData?formData.brand.name:""}</p>
                                        <p className='ProductPrice'>{formData?formData.name:""}</p>

                                        <Rating />

                                        <p className='ProductH'>
                                            <span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>
                                            
                                            {formData ? formData.salePrice : ""}&nbsp; 

                                            <del className='ProductPrice'>{formData ? formData.MRP : ""} </del>

                                             <span className='text-warning'> &nbsp; {formData.offers}% off</span>
                                        </p>
                                        <div className='Textsm'>{formData ?formData.description:""} </div>
                                        <hr></hr>
                                        <Row>
                                            <Col md={6} lg={4}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Size :</label>
                                                    <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                                        {sizeList && sizeList.length > 0 && sizeList.map((item, ind) => {
                                                            // console.log(item);
                                                            return <Fragment key={ind}>
                                                                <OverlayTrigger
                                                                    key="bottom"
                                                                    placement="bottom"
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-bottom`}>
                                                                            Qantity Left Only <strong>{item.quantity}</strong>.  
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button className={sizeinfo.sizeId === item.sizeId._id ? "btn btn-success text-white" : "btn btn-primary text-white"} type="button" onClick={(k) => handlesizeClick(item.sizeId)} >{item.sizeId.name}</Button>
                                                                </OverlayTrigger>
                                                 
                                                            </Fragment>
                                                        })
                                                        }
                                             
                                                    </div>
                                                </div>
                                                {/* <Size /> */}
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Color :</label>
                                                    <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                                        {formData.colors && formData.colors.length > 0 && formData.colors.map((item, ind) => {
                                                            return <Fragment key={ind}>
                                                                <button className={colorinfo.colorId === item.colorId._id ? "btn colorbtn border-dark" :"btn colorbtn border-warning"} style={{ backgroundColor: `#${item.colorId.code}` }} type="button" onClick={(k) => handlecolorClick(item.colorId)}></button>
                                                            </Fragment>
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col  md={12} lg={4}>
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
                                                            <Nav.Link className='mb-2' eventKey="first">Product Description</Nav.Link>
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

export default ProductDetailsold;