import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import AlertBox from "../../components/AlertBox";
import AddressBlockL from '../component/AddressBlockL';
import AddressBlockR from '../component/AddressBlockR';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';
import { getAddressAction } from "../../action/Front.action";
import AddAddressModel from '../component/AddAddressModel';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [addresslist, setAddressList] = useState({});

    const getAddressList = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await getAddressAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setAddressList(resp.data[0].addresses);
        }
    }

    const handleChange = (e, name) => {

        let data = { ...formData };
        if (name === 'checkbox') {

            if (e.target.checked) {
                data[name] = e.target.value;
            } else {
                data[name] = "";
            }

        } else {
            data[name] = e.target.value;
        }

        setFormData(data);
    }

    const selectAddress = () => {
        if (localStorage.loginType === 'user' && localStorage.userType) {
            if (formData.addressId) {
                var userAddressID = formData.addressId;
                localStorage.setItem('userAddressID', JSON.stringify(userAddressID));
                setTimeout(() => {
                    navigate('/payment');
                }, 500);

            } else {
                dispatch(setAlert({ open: true, severity: "danger", msg: "Please Select Address", type: '' }));  
            }
        } else {
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
    }

    // console.log(formData);
    useEffect(() => {

        getAddressList();
        if (localStorage.getItem('cartlist')) { } else {
            navigate('/');
        }
    }, [formData]);

    return (
        <div className="Address-Page">
            <Container fluid>
                <AlertBox />
                <Row className='mt-3 mb-3'>
                    <Col md={8}>
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body className='p-4 '>
                                <p className='HomeblockCartBodyH1'>1.&nbsp;&nbsp;Select a delivery address</p>
                                <div className='addressblockScroll'>
                                    {
                                        addresslist && addresslist.length > 0 && addresslist.map((item, ind) => {
                                            let checked = (formData.addressId && formData.addressId === item._id) ? true : false;
                                            return <Fragment key={ind}>
                                             
                                                <Row>
                                                    <Col md={1}>
                                                        <Form.Check type="radio" aria-label="radio 1" id="custom-switch" value={item._id} onChange={e => handleChange(e, 'addressId')} checked={checked} />
                                                    </Col>
                                                    <Col md={10}>
                                                        <AddressBlockL item={item} />
                                                    </Col>
                                                </Row>
                                           
                                            </Fragment>
                                        })

                                     }
                                </div>{
                                        addresslist.length == 0 ?
                                            <>
                                                <p className='CartText text-center text-danger'>No Address Available Please Add Your Address</p>
                                            </>
                                        : 
                                        ''
                                    }  
                            </Card.Body>
                        </Card>
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body>
                                <AddAddressModel getAddressList={getAddressList} />
                            </Card.Body>
                        </Card>
                        <Card className='ProductFullCard mb-2'>
                            <Card.Body>
                                <Card.Title>2.&nbsp;&nbsp;Payment Method </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body>
                                        <AddressBlockR />
                                        <div className="d-grid  mx-auto">
                                            <Link className="btn LoginBtn text-white" onClick={selectAddress}>Use this Address</Link>
                                        </div>
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

export default AddressPage;