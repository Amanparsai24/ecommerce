import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';
import { useNavigate } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";
import LoginImg from "../../images/LoginImg.png";
import LoginImg1 from "../../images/LoginImg1.png";

function AdminLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({});
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);


    // After click on Request otp button this function will work
    // we uses async function
    const handleSubmit = async (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

            // Here we call api
            // let resp = await adminLoginAction(formData);
            // if (resp.code === 200) {
            //     sessionStorage.clear();
            //     localStorage.setItem('adminData', JSON.stringify(resp.data));
            //     localStorage.setItem('userType', "admin");
            //     localStorage.setItem('loginType', 'admin');
            //     localStorage.setItem('authorization', resp.token);
            //     dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));

            //     setTimeout(() => {
            //         navigate('/dashboard');
            //     }, 3000);

            // } else {
            //     var data = "";
            //     setDisabled(false);
            //     if (resp.error.email) {
            //         data = resp.error.email;
            //     }else{
            //         data = resp.error.password;
            //     }
            //     dispatch(setAlert({ open: true, severity: "danger", msg: data, type: '' }));
            // }
            // return false;
        }

    };


    const handleChange = (name, event) => {

        let from = { ...formData };

        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

    }


    return (
        <div className='login-page'>
            <AlertBox />
            <Container fluid className='no-lr-p'>
                <Row className='g-0'>
                    <Col md={5} className="loginLImg">

                    </Col>
                    <Col md={7} sm={12}>

                        <div className="text-center login-inner">
                            <div className='mb-4'>
                                <img src={LoginImg1} alt={LoginImg} />
                            </div>
                            <div className='mb-4'>
                                <h1 className='Heading'>Login</h1>
                            </div>
                            <div>
                                <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                                    <Row className="mb-4">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" className="form-control loginInp text-start" placeholder='User Name' value={formData.email ? formData.email : ""} onChange={e => handleChange('email', e)} required />
                                            <Form.Control.Feedback type="invalid" className='text-start'>Please Enter email</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-4">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="password" className="form-control loginInp text-start" placeholder='User Password' value={formData.password ? formData.password : ""} onChange={e => handleChange('password', e)} required />
                                            <Form.Control.Feedback type="invalid" className='text-start'>Please Enter Password</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <div className="d-grid col-12 mx-auto">
                                        <button className="btn LoginBtn" type="submit"> Login</button>
                                    </div>
                                    <div className='mb-5 mt-4'>
                                        <p className='Textsm text-start'><Link className='Textsm text-decoration-none'>Forgot Password ?</Link></p>
                                    </div>
                                </Form>
                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default AdminLogin;