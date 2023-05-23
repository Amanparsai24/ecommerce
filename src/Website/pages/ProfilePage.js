import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';
import { Gender, checkMobileNumber } from "../../common/Constant";


const ProfilePage = () => {

    const loginUser = JSON.parse(localStorage.getItem('userData'));
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [isDisabled, setDisabled] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (name, event) => {

        let from = { ...formData };

        if (name === 'mobileNumber') {
            let errors = formErrors;
            if (checkMobileNumber(event.target.value)) {
                errors.mobileNumber = "";
            } else {
                errors.mobileNumber = "Please provide a valid Mobile Number";
            }
            setFormErrors(errors);
        }

        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

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
            let msg = "You have Update Profile";
            console.log(formData)
            // let resp = await signupAction(formData);
            // if (resp.code === 200) {
            //     dispatch(setAlert({ open: true, severity: "success", msg: msg, type: '' }));
            // } else {

            //     var data = "";
            //     setDisabled(false);
            //     if (resp.error.fullName) {
            //         data = resp.error.fullName;
            //     } else if (resp.error.mobileNumber) {
            //         data = resp.error.mobileNumber;
            //     } else if (resp.error.gender) {
            //         data = resp.error.gender;
            //     } else {
            //         data = resp.error.dob;
            //     }
            //     dispatch(setAlert({ open: true, severity: "danger", msg: data, type: '' }));

            // }
            // return false;

        }
    };

    return (
        <div className="Profile-Page">
            <Container>
                <Row >
                    <Container >
                        <AlertBox />
                        <Row className='mt-3 mb-3 justify-content-center'>
                            <Col md={12} lg={10}>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/profile" className='breadcrumbCS'>My account</Link></li>
                                    </ol>
                                </nav>
                                <Row>
                                    <Col md={8}>
                                        <Card className='ProductFullCard mb-2'>
                                            <Card.Body className='p-4'>
                                                <p className='HomeblockCartBodyH1 text-center'>Personal Information</p>
                                                <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label className='Textsm'>Full Name</Form.Label>
                                                                <Form.Control type="text" className='profileInp' placeholder="e.g. Full Name" value={formData.fullName ? formData.fullName : ""} onChange={e => handleChange('fullName', e)} minLength="2" maxLength="128" required autoComplete="off" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label className='Textsm'>Number</Form.Label>
                                                                <Form.Control type="number" className='profileInp' placeholder="e.g. 9876543210" value={formData.mobileNumber} onChange={e => handleChange('mobileNumber', e)} pattern="\d*" minLength="10" maxLength="12" required autoComplete="off" />
                                                                {formErrors["mobileNumber"] ?
                                                                    <div className='error'>{formErrors["mobileNumber"]}</div>
                                                                    : <div className='error'></div>
                                                                }
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label className='Textsm'>Gender</Form.Label>
                                                                <Form.Select className='profileInp' aria-label="Default select example" value={formData.gender ? formData.gender : ""} onChange={e => handleChange('gender', e)} autoComplete="off" >
                                     
                                                                    {Gender.map((val, index) => {
                                                                        return <option value={val.value} key={index}>{val.name}</option>
                                                                    })
                                                                    }
                                                                </Form.Select>
                                                            </Form.Group> */}
                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label className='Textsm'>Date Of Birth</Form.Label>
                                                                <Form.Control type="date" className='profileInp' placeholder="name@example.com" value={formData.dob ? formData.dob : ""} onChange={e => handleChange('dob', e)} autoComplete="off" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label className='Textsm'>Email</Form.Label>
                                                                <Form.Control type="email" className='profileInp' placeholder={loginUser.email} disabled autoComplete="off" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div className="d-grid col-12 mx-auto mt-4">
                                                        <button className="btn wishListBtn text-white " type="submit" >Update Profile</button>
                                                    </div>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className='ProductFullCard p-2'>
                                            <Card.Body className=''>
                                                <div className="d-grid col-12 mx-auto mb-3">
                                                    <Link className="btn LoginBtn text-white" to="/myaddress">My Address</Link>
                                                </div>
                                                <div className="d-grid col-12 mx-auto mb-3">
                                                    <Link className="btn LoginBtn text-white" to="/myorders">My orders</Link>
                                                </div>
                                                <div className="d-grid col-12 mx-auto">
                                                    <Link className="btn LoginBtn text-white" to="/myorders">Customer Care</Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                            </Col>


                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default ProfilePage;