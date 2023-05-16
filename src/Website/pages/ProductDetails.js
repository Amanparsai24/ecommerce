import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { setAlert } from '../../slices/home';
import { Row, Col, Container, Card, Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faShoppingCart, faBolt, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { productListByIdAction, updateQuantityAction } from "../../action/Front.action";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { imgPath } from "../../common/Function";
import { QuantityPicker } from 'react-qty-picker';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
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

const ProductDetails = (props) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState();
    const [productId, setproductId] = useState(0);
    const [actionTriggered, setActionTriggered] = useState('');
    const [productqytinfo, setProductQYTInfo] = useState({ productqyt: 1, salePrice: 0, MRP: 0, discount: 0 });
    const [colorinfo, setColorInfo] = useState({ colorId: 0, colorName: "" });
    const [sizeinfo, setSizeInfo] = useState({ sizeId: 0, sizeName: "" });
    const [sizeList, setSizeList] = useState([]);
    const [image, setImage] = useState([]);
    const [mainimage, setMainmage] = useState(image && image[0] && image[0].img[0]);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }

    const getproductbyidList = async () => {
        let parsed = queryString.parse(window.location.search);
        let urlId = parsed.a;
        if (urlId) {
            dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
            const resp = await productListByIdAction({ productId: urlId });
            // console.log(resp);
            dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
            if (resp.code === 200) {
                setFormData(resp.data);
                setColorInfo({ colorId: resp.data.colors[0].colorId._id })
                localStorage.setItem("productDetails", JSON.stringify(resp.data));
            }
        } else {
            window.location.href = "/product";
        }
    }

    // console.log(formData.colors)
    const addtoCart = (data) => {
        var cartData;
        //   we chech here if there is data on cartlist or not
        if (localStorage.getItem('cartlist') === null) {
            cartData = [];
        } else {
            //   if there is  data on cartlist we set in carddata
            cartData = JSON.parse(localStorage.getItem('cartlist'));
        }
        // console.log(colorinfo.colorId, sizeinfo.sizeId)
        if (colorinfo.colorId && sizeinfo.sizeId) {
            data['colorId'] = colorinfo.colorId;
            data['colorName'] = colorinfo.colorName;
            data['sizeId'] = sizeinfo.sizeId;
            data['sizeName'] = sizeinfo.sizeName;
            data['productqyt'] = productqytinfo.productqyt;
            data['salePrice'] = productqytinfo.salePrice;
            data['MRP'] = productqytinfo.MRP;
            data['discount'] = productqytinfo.discount;
            cartData.push(data);
            localStorage.setItem('cartlist', JSON.stringify(cartData));
            dispatch(setAlert({ open: true, severity: "success", msg: 'Product added to cart ', type: '' }));
            var newdata = JSON.parse(localStorage.getItem('cartlist'));
            for (let i in newdata) {
                if (newdata[i]._id === formData._id) {
                    let id = newdata[i]._id;
                    setproductId(id);
                }
            }
        } else {
            if (colorinfo.colorId != 0) {
                dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Size", type: '' }));

            } else if (sizeinfo.sizeId != 0) {
                dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select color", type: '' }));

            } else {
                dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Color and Size", type: '' }));
            }
        }
    }

    const buyNow = (data) => {
        var cartData = [];
        if (localStorage.loginType === 'user' && localStorage.userType) {
            if (colorinfo.colorId && sizeinfo.sizeId) {
                data['colorId'] = colorinfo.colorId;
                data['colorName'] = colorinfo.colorName;
                data['sizeId'] = sizeinfo.sizeId;
                data['sizeName'] = sizeinfo.sizeName;
                data['productqyt'] = 1;
                if (productqytinfo.productqyt > 1) {
                    data['productqyt'] = productqytinfo.productqyt;
                    data['salePrice'] = productqytinfo.salePrice;
                    data['MRP'] = productqytinfo.MRP;
                    data['discount'] = productqytinfo.discount;
                }
                cartData.push(data);
                localStorage.setItem('buyNowdata', JSON.stringify(cartData));
                localStorage.setItem('buyNow', JSON.stringify("buyNow"));
                var price = 0;
                var discount = 0;
                var sizeId;
                var colorId;
                price = data.MRP;
                discount = data.discount;
                sizeId = data.sizeId;
                colorId = data.colorId;
                let pricedetails = { amount: price, discount: discount, couponDiscount: 0, totalAmount: price - discount, sizeId: sizeId, colorId: colorId };

                localStorage.setItem("purchaseData", JSON.stringify(pricedetails));
                window.location.href = "/address";
            } else {
                if (colorinfo.colorId != 0) {
                    dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Size", type: '' }));

                } else if (sizeinfo.sizeId != 0) {
                    dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select color", type: '' }));

                } else {
                    dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Color and Size", type: '' }));
                }
            }

        } else {
            handleShow();
        }
    }

    const handlecolorClick = (k) => {
        setColorInfo({ colorId: k._id, colorName: k.name });

    }

    const handlesizeClick = (k) => {
        setSizeInfo({ sizeId: k._id, sizeName: k.name });
    }

    const getPickerValue = async (value) => {
        let resp = await updateQuantityAction(value);
        if (resp.code === 200) {
            setProductQYTInfo({ productqyt: resp.data.quantity, salePrice: resp.data.salePrice, MRP: resp.data.MRP, discount: resp.data.discount });
        } else {
            dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
        }
    }

    const imgChange = (item) =>{
        setMainmage(item);
    }

    useEffect(() => {
        getproductbyidList();
    }, []);

    useEffect(() => {
        let allcolor = formData ? formData.colors : "";
        let multiImg = [];
        for (let i in allcolor) {
            if (allcolor[i].colorId._id === colorinfo.colorId) {

                let sizeid = allcolor[i].sizes;
             
                let image = allcolor[i].images[0];
                setMainmage(image);
      
                multiImg.push({ img: allcolor[i].images });
                setSizeList(sizeid);


            }
        }
        setImage(multiImg);
    }, [colorinfo.colorId]);


    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col sm={12} md={5}>
                        <Card className='ProductDetailsImgCard mb-2'>
                            <Row>
                                <Col sm={2} md={2} className='res_multiimg'>
                                    {image && image[0] && image[0].img.map((item, ind) => {
                                        return <Fragment key={ind}>
                                            <img src={imgPath(item)} className="card-img-top ProductDetailsImgsm mb-2" onMouseOver={e => imgChange(item)} alt="..." />
                                        </Fragment>
                                    })
                                    }
                                </Col>
                                <Col sm={12} md={10}>
                                    <img src={imgPath(mainimage ? mainimage :"")} className="card-img-top ProductDetailsImg " onClick={() => { handleShow(); setActionTriggered('ACTION_1') }} alt="..." />
                                    <span className="btn text-dark ProductDetailsheartPos"><FontAwesomeIcon icon={faHeart} /></span>
                                    <span className="btn text-dark ProductDetailsSharePos"><FontAwesomeIcon icon={faShareNodes} /></span>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col sm={12} md={12} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        {
                                            productId === formData ? formData._id : "" ?
                                                <>
                                                    <Link className="btn LoginBtn text-white mb-2" type="button" to="/cart" >
                                                        View Cart
                                                    </Link>
                                                </>
                                                :
                                                <>
                                                    <Button className='LoginBtn border-0 mb-2' onClick={e => addtoCart(formData)}>
                                                        <FontAwesomeIcon icon={faShoppingCart} />{' '}Add to cart
                                                    </Button>
                                                </>
                                        }
                                    </div>
                                </Col>
                                <Col sm={12} md={12} lg={6}>
                                    <div className="d-grid  mx-auto">
                                        <Button className='LoginBtn border-0' onClick={e => buyNow(formData)}>
                                            <FontAwesomeIcon icon={faBolt} />{' '}Buy Now
                                        </Button>
                                    </div>
                                    <Modal show={show} size="lg" onHide={handleClose}>
                                        {actionTriggered === 'ACTION_1' ?
                                            <>
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                      {formData ? formData.name : ""}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Carousel>
                                                        {image && image[0] && image[0].img.map((item, ind) => {
                                                            return <Fragment key={ind}>
                                                                <div>
                                                                    <img src={imgPath(item)} className="card-img-top ProductDetailsImg" alt="..." />
                                                        
                                                                </div>
                                                            </Fragment>
                                                        })
                                                        }
                                                    </Carousel>
                                                </Modal.Body>
                                            </>
                                            :
                                            <LoginModel />
                                        }
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
                                        <p className='ProductH'>{formData ? formData.brand.name : ""}</p>
                                        <p className='ProductPrice'>{formData ? formData.name : ""}</p>
                                        <Rating />
                                        <p className='ProductH'>
                                            <span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>
                                            {formData ? formData.salePrice : ""}&nbsp;
                                            <del className='ProductPrice'>{formData ? formData.MRP : ""} </del>
                                            <span className='text-warning'> &nbsp; {formData ? formData.offers : ""}% off</span>
                                        </p>
                                        <div className='Textsm'>{formData ? formData.description : ""} </div>
                                        <hr></hr>
                                        <Row>
                                            <Col xs={4} md={6} lg={4}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Size :</label>
                                                    <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                                        {sizeList && sizeList.length > 0 && sizeList.map((item, ind) => {
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
                                            <Col xs={4} md={6} lg={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Color :</label>
                                                    <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                                        {formData && formData.colors && formData.colors.length > 0 && formData.colors.map((item, ind) => {
                                                            return <Fragment key={ind}>
                                                                <button className={colorinfo.colorId === item.colorId._id ? "btn colorbtn border-dark rounded-circle" : "btn colorbtn border-warning"} style={{ backgroundColor: `${item.colorId.code}` }} type="button" onClick={(k) => handlecolorClick(item.colorId)}></button>
                                                            </Fragment>
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} lg={4}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Quantity :</label>
                                                    <div className='quantityUpdate'>
                                                        <QuantityPicker min={1} value={productqytinfo.productqyt} onChange={e => getPickerValue({ quantity: e, productId: formData._id })} />
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
                                                <Col sm={12} lg={12}>
                                                    <Nav variant="pills" >
                                                        <Nav.Item>
                                                            <Nav.Link className='mb-2' eventKey="first">Product Description</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="second">Customer Reviews</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Col>
                                                <Col sm={12} lg={12} className="mt-3">
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">
                                                            <ProductDescription properties={formData ? formData.properties : ""} />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="second">
                                                            <CustomerReviews />
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