import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Container, Card, Form , Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";
import AddAddressModel from '../component/AddAddressModel';
import { setAlert } from '../../slices/home';
import { getAddressAction, addresseditAction, addressDeleteAction } from "../../action/Front.action";
import { GetAllCountries, GetStatesOfCountry, GetCitiesOfState, checkName, checkMobileNumber, emailValidation } from "../../common/Function";
import { confirmAlert } from 'react-confirm-alert';

const MyAddress = () => {
    document.title = "Ecommerce - My Address";
    const dispatch = useDispatch();
    const [addresslist, setAddressList] = useState({});
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({});

    const handleShow = (item = {}) => {
        setShow(true);
        setFormData({});
        if (item._id) {
            let editData = {
                _id: item._id,
                name: item.name,
                phoneNumber:item.phoneNumber,
                pinCode: item.pinCode,
                streetAddess: item.streetAddess,
                houseNumber: item.houseNumber,
                country: item.country,
                state: item.state,
                city: item.city,
            }
            setFormData(editData);
        }
    }

    const handleClose = () => {
        setShow(false);
    }

    const getAddressList = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await getAddressAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            // setUserData(resp.data);
            setAddressList(resp.data[0].addresses);
        }
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            event.stopPropagation();
            setDisabled(true);
            let msg = "You have successfully registered.";

            let resp = await addresseditAction(formData);

            if (resp.code === 200) {

                dispatch(setAlert({ open: true, severity: "success", msg: msg, type: '' }));
                getAddressList();
                handleClose();
                setFormData({});

            } else {

                var data = "";
                setDisabled(false);
                if (resp.error.houseNumber) {
                    data = resp.error.houseNumber;
                } else if (resp.error.pinCode) {
                    data = resp.error.pinCode;
                } else if (resp.error.streetAddess) {
                    data = resp.error.streetAddess;
                } else if (resp.error.city) {
                    data = resp.error.city;
                } else if (resp.error.state) {
                    data = resp.error.state;
                } else if (resp.error.name) {
                    data = resp.error.name;
                } else if (resp.error.phoneNumber) {
                    data = resp.error.phoneNumber;
                } else {
                    data = resp.error.country;
                }
                dispatch(setAlert({ open: true, severity: "danger", msg: data, type: '' }));

            }
            return false;
        }

    }

    const handleChange = (name, event) => {

        let from = { ...formData };

        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

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

                        const resp = await addressDeleteAction({ addressesId: id });
                        if (resp.code === 200) {

                            getAddressList();
                            dispatch(setAlert({ open: true, severity: "success", msg: "You have successfully deleted Address.", type: '' }));

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

        getAddressList();

    }, []);


    return (
        <div className="Profile-Page">
            <Container>
                <Row >
                    <Container >
                        <AlertBox />
                        <Row className='mt-3 mb-3'>
                            <Col md={12}>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/profile" className='breadcrumbCS'>My account</Link></li>
                                        <li className="breadcrumb-item  active" aria-current="page">My Addresses</li>
                                    </ol>
                                </nav>
                            </Col>
                            <Col md={12}>
                                <Card className='ProductFullCard mb-2'>
                                    <Card.Body className='p-4'>
                                        <p className='HomeblockCartBodyH1'>Manage Address</p>
                                        <Row className='mb-3 p-2'>
                                            <Col md={12} className="btn btn-outline-secondary text-start">
                                                <AddAddressModel getAddressList={getAddressList}  />
                                            </Col>
                                        </Row>
                                        <Row>
                                        {
                                            addresslist && addresslist.length > 0 && addresslist.map((item, ind) => {
                      
                                                return <Col md={6} key={ind}>
                                                    <Card className='addressCard mb-2' >
                                                        <Card.Body className='p-4' >
                                                            <Col md={12}>
                                                                <Row> 
                                                                    <Col md={12}>
                                                                        <p className='CartText'>{item.name}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <p className='CartText'>{item.houseNumber},{item.streetAddess},{item.city},{item.state},{item.pinCode}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <p className='CartText'>{item.country}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={12}>
                                                                        <p className='CartText'>Phone Number : {item.phoneNumber}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <span className="btn btn-sm cartbtn" title="Edit" onClick={e => handleShow(item)} > Edit</span>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <span className="btn btn-sm cartbtn" title="Delete" onClick={e => _delete(item._id)}>Delete</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            })
                                        }
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='CouponModelh'>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                        <Row>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" className="form-control loginInp" placeholder='User Name' value={formData.name ? formData.name : ""} onChange={e => handleChange('name', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter House Number</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                            </Col>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="number" className="form-control loginInp" placeholder='User Number' value={formData.phoneNumber ? formData.phoneNumber : ""} onChange={e => handleChange('phoneNumber', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter Number</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" className="form-control loginInp" placeholder='House/Office Number' value={formData.houseNumber ? formData.houseNumber : ""} onChange={e => handleChange('houseNumber', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter House Number</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                            </Col>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="number" className="form-control loginInp" placeholder='Pincode' value={formData.pinCode ? formData.pinCode : ""} onChange={e => handleChange('pinCode', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter pin code</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" className="form-control loginInp" placeholder='Street Address' value={formData.streetAddess ? formData.streetAddess : ""} onChange={e => handleChange('streetAddess', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter street Addess</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example" className="loginInp" value={formData.country ? formData.country : ""} onChange={e => handleChange('country', e)} required>
                                            <GetAllCountries />
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter House Number</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example" className="loginInp" value={formData.state ? formData.state : ""} onChange={e => handleChange('state', e)} required>
                                            <GetStatesOfCountry countryCode={formData.country ? formData.country : ""} />
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter House Number</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example" className="loginInp" value={formData.city ? formData.city : ""} onChange={e => handleChange('city', e)} required>
                                            <GetCitiesOfState countryCode={formData.country ? formData.country : ""} stateCode={formData.state ? formData.state : ""} />
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter House Number</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <div className="d-grid col-12 mx-auto mt-3">
                            <button className="btn LoginBtn text-white" type="submit"> Edit Address</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MyAddress;