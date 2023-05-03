import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {  Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction, otpVerificationAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import OtpInput from 'react-otp-input';
import SocialButton from "../pages/SocialButton";

const LoginModel = () => {

    const dispatch = useDispatch();
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const [formData, setFormData] = useState({});
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [otpverify, setOtpVerify] = useState(0);
    const [email, setEmail] = useState();

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
            let resp = await loginAction(formData);
            if (resp.code === 200) {
                // sessionStorage.clear();
                localStorage.setItem('authorization', resp.token);
                let data = { ...formData, email: resp.data.email };
                dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));
                setOtpVerify(1);
                setEmail(data.email);
            } else {
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

    const handleSubmit1 = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            event.stopPropagation();
            setDisabled(true);

            let resp = await otpVerificationAction(formData);

            if (resp.code === 200) {
                localStorage.setItem('userData', JSON.stringify(resp.data));
                localStorage.setItem('userType', "user");
                localStorage.setItem('loginType', 'user');
                dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));
                if (localStorage.getItem('btntype') === 'buyNow'){
                    window.location.href = "/address";  
                }else{
                    window.location.href = "/cart";  
                }
            } else {
                // console.log(resp);
                setDisabled(false);
                dispatch(setAlert({ open: true, severity: "danger", msg: resp.error.otp, type: '' }));

            }
            return false;
        }

    };


    const handleChange = (name, event) => {

        let from = { ...formData };

        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

    }

    const handleChange2 = (name, event) => {

        let from = { ...formData };

        from[name] = event;

        setFormData({ ...formData, ...from });

    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className='CouponModelh'>Join / Sign In using</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {
                    otpverify === 0 ? 
                        <>
                            <div className='mb-5 mt-4 text-center '>
                                <SocialButton />
                            </div>
                            <div className="or or-divider mb-4"><span>OR</span></div>
                            <div>
                                <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
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
                        </>
                    :
                        <>
                            <div>
                                <div className='mb-4'>
                                    <p className='Text text-center'>Please enter your code sent to </p>
                                    <p className='Text text-center'>{email}</p>
                                </div>
                                <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit1(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <OtpInput value={formData.otp ? formData.otp : ""} onChange={e => handleChange2('otp', e)} numInputs={6} containerStyle="containerStyle" separator={<span style={{ width: "30px" }}></span>} inputStyle={{
                                            border: "1px solid #FAFAFA", borderRadius: "8px", width: "80px", height: "80px",
                                            backgroundColor: "#FAFAFA", textAlign: "center", fontSize: "30px"
                                        }} focusStyle={{
                                            border: "1px solid #CFD3DB",
                                            outline: "none"
                                        }} />
                                        <Form.Control.Feedback type="invalid" className='text-start'>Please Enter Number</Form.Control.Feedback>
                                    </Form.Group>
                                    <div className='mb-5 mt-4'>
                                        <p className='Textsm text-start'>Resent Code  </p>
                                    </div>
                                    <div className="d-grid col-12 mx-auto">
                                        <button className="btn LoginBtn" type="submit">Verify</button>
                                    </div>
                                </Form>
                            </div>
                        </>

                }
          
            </Modal.Body>
        </>
    );
}

export default LoginModel;