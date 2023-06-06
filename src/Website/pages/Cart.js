import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Container, Modal } from 'react-bootstrap';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setAlert, setCartItem } from '../../slices/home';
import { confirmAlert } from 'react-confirm-alert';
import { imgPath } from "../../common/Function";

import BagEmpty from '../component/BagEmpty';
import LoginModel from '../component/LoginModel';
import CartBlockR from '../component/CartBlockR';
import AlertBox from '../../components/AlertBox';
import QuantityModel from '../component/QuantityModel';
import CartProductDetails from '../component/CartProductDetails';

import { saveWishlistItemAction, getWishlistAction } from "../../action/Front.action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    document.title = "Ecommerce - Cart";
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);
    const [wishlistproduct, setWishListProduct] = useState({});
    const [cartlist, setCartList] = useState([]);
    // const [numofproduct, setNumOfProduct] = useState(0);
    const [wishlistid, setWishListId] = useState(0);
    const [totalprice, setTotalPrice] = useState(0);
    const [userLoged, setUserLoged] = useState(0);

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
                // setNumOfProduct(cartlist.length);
            }

            let data = { amount: price, discount: discount, couponDiscount: 0, totalAmount: price - discount };

            localStorage.setItem("purchaseData", JSON.stringify(data));
        }
     
    }

    const addtowishlist = async (item) => {

        if (localStorage.loginType == 'user' && localStorage.userType) {
            let resp = await saveWishlistItemAction({ productId: item._id , colorId: item.colorId });
            if (resp.code === 200) {
                dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
                const cartlist = JSON.parse(localStorage.getItem('cartlist'));
                for (let i in cartlist) {
                    let productid = cartlist[i]._id;

                    if (productid === item._id) {
                        let price = cartlist[i].salePrice;
                        let productIdIndex = i;
                        cartlist.splice(productIdIndex, 1);
                        localStorage.setItem("cartlist", JSON.stringify(cartlist));
                        setTotalPrice(totalprice - price);
                        getcartlist();
                        gettotalprice();
                        // getWishList();
                    }
                }
                dispatch(setCartItem(cartlist.length));
            } else {
                dispatch(setAlert({ open: true, severity: "danger", msg: resp.error.product, type: '' }));
            }
        } else {
            setUserLoged(1);
            handleShow();
        }

    }

    const _delete = async (id) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {

                        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));

                        const cartlist = JSON.parse(localStorage.getItem('cartlist'));
                        for (let i in cartlist) {
                            let productid = cartlist[i]._id;

                            if (productid === id) {
                                let price = cartlist[i].salePrice;
                                let productIdIndex = i;
                                cartlist.splice(productIdIndex, 1);
                                localStorage.setItem("cartlist", JSON.stringify(cartlist));
                                setTotalPrice(totalprice - price);
                                dispatch(setAlert({ open: true, severity: "success", msg: "You have successfully deleted item.", type: '' }));
                                getcartlist();
                                gettotalprice();
                            }
                        }
                        dispatch(setCartItem(cartlist.length));

                        
                    }

                },
                {
                    label: 'No',
                }
            ]
        });

    }

    // const getWishList = async () => {
    //     if (localStorage.loginType == 'user' && localStorage.userType) {
    //         dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
    //         const resp = await getWishlistAction();
    //         dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
    //         if (resp.code === 200) {
    //             setWishListProduct(resp.data[0].products);
    //             let wishlist = resp.data[0].products.productId;
    //             for (let i in wishlist) {
    //                 let id = wishlist[i]._id;
    //                 setWishListId(id)
    //             }
    //         }
    //     }
    // }

    useEffect(() => {

        // getWishList();
        gettotalprice();
        getcartlist();

    }, []);

    // console.log(wishlistid)

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col xs={12} md={12} lg={8}>
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body className='p-4'>
                                <p className='HomeblockCartBodyH1'>Shopping Cart</p>
                                <hr></hr>
                                {cartlist.length > 0 && cartlist.map((item, ind) => {
                                    return <Fragment key={ind}>
                                        <Row>
                                            <Col md={4}>
                                                <Card className='border-0'>
                                                    <img src={imgPath(item.img ? item.img : item.colors[0].colors)} className="card-img-top ProductImg" alt="..." />
                                                </Card>
                                            </Col>
                                            <Col md={8}>
                                                <Card className='ProductCard'>
                                                    <Card.Body>
                                                        <CartProductDetails item={item} />
                                                        <Row className='mt-2 mb-2'>
                                                            <Col md={7}>
                                                                <QuantityModel item={item} getcartlist={getcartlist} gettotalprice={gettotalprice} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={5}>
                                                                {/* {
                                                                    wishlistid.wishlistid === item._id ?
                                                                        <>
                                                                            <span className="btn btn-sm cartbtn  btn-outline-dark border-1" title="Whislist"><FontAwesomeIcon icon={faHeart} className="text-danger" /> WISHLISTED</span>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <span className="btn btn-sm cartbtn" title="Whislist" onClick={e => addtowishlist(item._id)} ><FontAwesomeIcon icon={faHeart} className="text-danger" /> Move to WishList</span>

                                                                            <Modal show={show} size="lg" onHide={handleClose}>
                                                                                {
                                                                                    userLoged === 1 &&

                                                                                    <LoginModel />

                                                                                }
                                                                            </Modal>
                                                                        </>
                                                                } */}
                                                           
                                                                <span className="btn btn-sm cartbtn" title="Whislist" onClick={e => addtowishlist(item)} ><FontAwesomeIcon icon={faHeart} className="text-danger" /> Move to WishList</span>

                                                                <Modal show={show} size="lg" onHide={handleClose}>
                                                                    {
                                                                        userLoged === 1 &&

                                                                        <LoginModel />

                                                                    }
                                                                </Modal>
                                                                      
                                                             
                                                            </Col>
                                                            <Col md={6}>
                                                                <span className="btn btn-sm cartbtn" title="Delete" onClick={e => _delete(item._id)}>Delete</span>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <hr></hr>
                                    </Fragment>
                                })}
                                {cartlist == null || cartlist == "" &&
                                    <>
                                        <BagEmpty wishlistproduct={wishlistproduct} />
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={4}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body>
                                        <p className='HomeblockCartBodyH1'>Price Details</p>
                                        <hr></hr>
                                        <CartBlockR  />
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