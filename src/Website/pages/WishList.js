import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash , faPencil  } from '@fortawesome/free-solid-svg-icons';
import { imgPath } from "../../common/Function";
import { setAlert } from '../../slices/home';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getWishlistAction, removeWishlistItemAction } from "../../action/Front.action";
import AlertBox from "../../components/AlertBox";
import Rating from '../component/Rating';
import AddList from './AddList';
import AddProductToList from './AddProductToList';

import { Link } from 'react-router-dom';

function WishList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ listId: 0 });
    const [wishlist, setWishList] = useState({});
    const [list, setList] = useState({});

    const getWishList = async (action = '') => {
   
        if (localStorage.loginType == 'user' && localStorage.userType) {
            let data = { ...formData };
            if (action === 'clear') {

                data = { listId: 0 };
                setFormData(data);
            }
            dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
            const resp = await getWishlistAction(data);
            dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
            if (resp.code === 200) {
                // console.log(resp.data[0].products);
                setWishList(resp.data[0].products);
                setList(resp.data[0].list);
            }
        }
    }


    const changeTabKey = (id) => {
  
        let data = { ...formData };
        data['listId'] = id;
        setFormData(data);

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
                        let resp = await removeWishlistItemAction({ products: id });
                        if (resp.code === 200) {
                            dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
                            // setTimeout(() => {
                            //     navigate('/wishList');
                            // }, 500);
                            getWishList();
                        } else {
                            dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
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
        getWishList();
        
    }, [formData.listId]);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={3}>
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body className='p-4'>
                                <Row>
                                    <Col md={8}>
                                        <p className='HomeblockCartBodyH1'>My list</p>
                                    </Col>
                                    <Col md={4} >
                                        <AddList getWishList={getWishList} />
                                    </Col>
                                </Row>
                              <hr></hr>
                                <Row>
                                    {list && list.length > 0 && list.map((item, ind) => {
                                        // console.log(item);
                                        return <Col md={12} key={ind}>
                                            <p className='navMH'><Link className="text-decoration-none text-dark" onClick={e => changeTabKey(item._id)} >{item ? item.name : ""}</Link></p>
                                        </Col>
                                    })
                                    }
                                    { list.length > 0 ?

                                        <Col md={12}>
                                            <hr></hr>
                                            <div className="d-grid  mx-auto">
                                                <Link className="btn LoginBtn text-white" to="#" onClick={e => getWishList('clear')}>All WishList Product</Link>
                                            </div>
                                        </Col>:""
                                    }
                             </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body className='p-4'>
                                        <p className='HomeblockCartBodyH1'>My Wishlist </p>
                                        <hr></hr>
                                        {wishlist && wishlist.length > 0 && wishlist.map((item, ind) => {
                                            return <Col xs={12} md={12} lg={12} key={ind}>
                                                <Row>
                                                    <Col md={3}>
                                                        <img src={imgPath(item.image)} className="card-img-top WishlistImg" alt="..." />
                                                    </Col>
                                                     <Col md={9}>
                                                        <Row>
                                                            <Col md={10}>
                                                                <p className='ProductH'> {item.name}</p>
                                                            </Col>
                                                            <Col md={2}>

                                                                <span className="btn text-dark" title='Delete' onClick={e => _delete(item._id)}><FontAwesomeIcon icon={faTrash} /></span>

                                                                <AddProductToList id={item._id} list={list} getWishList={getWishList}  />
                                            
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={10}>
                                                                <p className='ProductH'>Size : {item.sizes?item.sizes[0].name:""}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={10}>
                                                                <Rating />
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col md={10}>
                                                                <p className='ProductH'>$ {item.salePrice}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <hr></hr>
                                            </Col>
                                        })
                                        }
                                  
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

export default WishList;