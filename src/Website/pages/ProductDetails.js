import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { setAlert } from '../../slices/home';
import { Row, Col, Container, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faShoppingCart, faBolt, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { imgPath } from "../../common/Function";
import { QuantityPicker } from 'react-qty-picker';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

const ProductDetails = () => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [formData, setFormData] = useState(state);
    const [formData, setFormData] = useState(() => {
        const productDetails = JSON.parse(localStorage.getItem('productDetails'));
        return productDetails || null;
    });

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

    const addtoCart = (data , type="") => {
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
        if (type == "buyNOW") {
            const cartlist = JSON.parse(localStorage.getItem('cartlist'));
            if (cartlist) {
                var price = 0;
                var discount = 0;
                var sizeId;
                var colorId;
                for (let i in cartlist) {

                    price += cartlist[i].MRP;
                    discount += cartlist[i].discount;
                    sizeId = cartlist[i].sizeId;
                    colorId = cartlist[i].colorId;
                }

                let data = { amount: price, discount: discount, couponDiscount: 0, totalAmount: price - discount, sizeId: sizeId, colorId: colorId };

                localStorage.setItem("purchaseData", JSON.stringify(data));
            }
            if (localStorage.loginType === 'user' && localStorage.userType) {
                window.location.href = "/address";  
            } else {
                localStorage.setItem('btntype', "buyNow");
                handleShow();
            }
        }else{
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
                                                    <Link className="btn LoginBtn text-white mb-2" type="button" to="#" onClick={e => addtoCart(formData)}><FontAwesomeIcon icon={faShoppingCart} />{' '}Add to cart</Link>
                                                </>

                                        }
                                
                                    </div>
                                </Col>
                                <Col md={4} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        <Link className="btn LoginBtn text-white " type="button" onClick={e => addtoCart(formData , 'buyNOW')}><FontAwesomeIcon icon={faBolt} />{' '}Buy Now</Link>
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
                                                            return <Fragment key={ind}>
                                                                <button className={sizeinfo.sizeId === item.sizeId._id ? "btn btn-success text-white" : "btn btn-primary text-white"} type="button" onClick={(k) => handlesizeClick(item.sizeId)} >{item.sizeId.name}</button>
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

export default ProductDetails;