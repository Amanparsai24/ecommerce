import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginAction } from "../../action/Front.action";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';
import { useNavigate } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";
import LoginImg from "../../images/LoginImg.png";
import LoginImg1 from "../../images/LoginImg1.png";
import SocialButton from "./SocialButton";

function Login() {

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
        }else{
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

            // Here we call api
            let resp = await loginAction(formData);
            if (resp.code === 200) {
                sessionStorage.clear();
                localStorage.setItem('userData', JSON.stringify(resp.data));
                localStorage.setItem('userType', "user");
                localStorage.setItem('loginType', 'user');
                localStorage.setItem('authorization', resp.token);
                let data = { ...formData, email: resp.data.email };
                dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));

                setTimeout(() => {
                    navigate('/otp', { state: data });
                }, 3000);

            }else {
                var data = "";
                setDisabled(false);
                if (resp.error.email) {
                    data = resp.error.email;
                } 
                dispatch(setAlert({ open: true, severity: "danger", msg: data, type: '' }));
            }
            return false;
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
                                <h1 className='Heading'>Get started</h1>
                            </div>
                            <div className='mb-4'>
                                <p className='Text'>Already have an account? &nbsp;<Link className='text-decoration-none Text'>Login</Link> </p>
                            </div>
                            <div className="or or-divider"><span>OR</span></div>
                            <div className='mb-5 mt-4'>
                                <SocialButton />
                            </div>
                            <div>
                                <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                                    {/* <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="number" className="form-control loginInp text-start" placeholder='Enter mobile number' value={formData.number ? formData.number : ""} onChange={e => handleChange('number', e)}  required/>
                                    <Form.Control.Feedback type="invalid" className='text-start'>Please Enter Number</Form.Control.Feedback>
                                </Form.Group> */}
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" className="form-control loginInp text-start" placeholder='Enter Email' value={formData.email ? formData.email : ""} onChange={e => handleChange('email', e)} required />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter email</Form.Control.Feedback>
                                    </Form.Group>
                                    <div className='mb-5 mt-4'>
                                        <p className='Textsm text-start'>By continuing, you agree to <Link className='Textsm'>Terms of Use</Link> and <Link className='Textsm'>Privacy Policy</Link>. </p>
                                    </div>
                                    <div className="d-grid col-12 mx-auto">
                                        <button className="btn LoginBtn text-white" type="submit"> Request OTP</button>
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

export default Login;