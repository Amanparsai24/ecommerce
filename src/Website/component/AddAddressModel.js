import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addressaddAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import { useDispatch } from 'react-redux';
import { GetAllCountries, GetStatesOfCountry, GetCitiesOfState, checkName, checkMobileNumber } from "../../common/Function";

const AddAddressModel = ({ getAddressList }) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({});

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

            let resp = await addressaddAction(formData);

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

    return (
        <>
            <span onClick={handleShow} className='ProductH'>
                <FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;Add new address
            </span>
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='CouponModelh'>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                        <Row>
                            <Col md={6}>
                                <Row className="mb-4">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" className="form-control loginInp" placeholder='User Name' value={formData.name ? formData.name : ""} onChange={e => handleChange('name', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter User Name</Form.Control.Feedback>
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
                            <button className="btn LoginBtn text-white" type="submit"> Add Address</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddAddressModel;