import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { setAlert } from '../../slices/home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { saveWishlistItemAction, getWishlistAction } from "../../action/Front.action";
import { Card, Col, Row } from 'react-bootstrap';
import { imgPath } from "../../common/Function";
import { confirmAlert } from 'react-confirm-alert';
import CartProductDetails from './CartProductDetails';
import QuantityModel from './QuantityModel';
import DeleteProduct from './DeleteProduct';
import LoginModel from './LoginModel';
import BagEmpty from './BagEmpty';

const CartBlockL = ({  gettotalprice }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);
    const [wishlistproduct, setWishListProduct] = useState({});
    const [wishlistid, setWishListId] = useState();
    const [totalprice, setTotalPrice] = useState(0);
    const [userLoged, setUserLoged] = useState(0);
    const [cartlist, setCartList] = useState([]);

    const getcartlist = () => {

        if (localStorage.getItem('cartlist') && !localStorage.getItem('cartlist') == "") {
            const cartlist = JSON.parse(localStorage.getItem('cartlist'));
            setCartList(cartlist);
        }
    }

    const getWishList = async () => {
        if (localStorage.loginType == 'user' && localStorage.userType) {
            dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
            const resp = await getWishlistAction();
            dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
            if (resp.code === 200) {
                // setWishList(resp.data);
                setWishListProduct(resp.data[0].products);
                const wishlist = resp.data;

                for (let i in wishlist) {
                    if (wishlist[i].products.length > 0) {
                        let wislistid = wishlist[i].products[i]._id;
                        setWishListId(wislistid);
                    }
                }
            }
        }
    }

    const addtowishlist = async (id) => {

        if (localStorage.loginType == 'user' && localStorage.userType) {
            let resp = await saveWishlistItemAction({ productId: id });
            if (resp.code === 200) {
                dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
                const cartlist = JSON.parse(localStorage.getItem('cartlist'));
                for (let i in cartlist) {
                    let productid = cartlist[i]._id;

                    if (productid === id) {
                        let price = cartlist[i].salePrice;
                        let productIdIndex = i;
                        cartlist.splice(productIdIndex, 1);
                        localStorage.setItem("cartlist", JSON.stringify(cartlist));
                        setTotalPrice(totalprice - price);
                        getcartlist();
                    }
                }
                window.location.reload(false);
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
                                window.location.reload(false);
                                // const purchaseData = JSON.parse(localStorage.getItem('purchaseData'));
                                // let newprice = purchaseData.amount - price;
                                // let newdiscount = purchaseData.discount - cartlist[i].discount;
                                // let data = { amount: newprice, discount: newdiscount, couponDiscount: 0, totalAmount: newprice - newdiscount };

                                // localStorage.setItem("purchaseData", JSON.stringify(data));
             
                             
                            }
                        }
                    }

                },
                {
                    label: 'No',
                }
            ]
        });

    }

    useEffect(() => {
        getcartlist();
        getWishList();

    }, []);

    return (
        <>
            {cartlist.length > 0 && cartlist.map((item, ind) => {
                return <Fragment key={ind}>
                    <Row>
                        <Col md={4}>
                            <Card className='border-0'>
                                <img src={imgPath(item.image[0])} className="card-img-top ProductImg" alt="..." />
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card className='ProductCard'>
                                <Card.Body>
                                        {/* Product More details */}
                                    <CartProductDetails item={item} />

                                    <Row className='mt-2 mb-2'>
                                        <Col md={7}>
                                            <QuantityModel item={item} getcartlist={getcartlist} gettotalprice={gettotalprice}  />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}>
                                            {
                                                wishlistid === item._id ?
                                                    <>
                                                        <span className="btn btn-sm cartbtn  btn-outline-dark border-1" title="Whislist"><FontAwesomeIcon icon={faHeart} className="text-danger" /> WISHLISTED</span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="btn btn-sm cartbtn" title="Whislist" onClick={e => addtowishlist(item._id)} >Save for later</span>

                                                        <Modal show={show} size="lg" onHide={handleClose}>
                                                            {
                                                                userLoged === 1 &&

                                                                <LoginModel />

                                                            }
                                                        </Modal>
                                                    </>
                                            }
                                        </Col>
                                        <Col md={7}>
                                            <span className="btn btn-sm cartbtn" title="Delete" onClick={e => _delete(item._id)}>Delete</span>
                                            {/* <DeleteProduct item={item} gettotalprice={gettotalprice} getcartlist={getcartlist} /> */}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <hr></hr>
                </Fragment>
            })}

            {cartlist == null ||  cartlist == "" &&
                <>
                    <BagEmpty wishlistproduct={wishlistproduct} />
                </>
            }
        </>
    );
}

export default CartBlockL;