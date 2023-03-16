import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { otpVerificationAction } from "../../action/Front.action";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../slices/home';
import OtpInput from 'react-otp-input';
import AlertBox from "../../components/AlertBox";

const OtpVerify = () => {

    const {state} = useLocation();
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
            setDisabled(true);

            let resp = await otpVerificationAction(formData);

            if (resp.code === 200) {

                dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));
                window.location.href = "/";  

                // setTimeout(() => {
                //     navigate('/');
                // }, 3000);

            } else {

                setDisabled(false);
                dispatch(setAlert({ open: true, severity: "danger", msg: resp.error.otp, type: '' }));

            }
            return false;
        }

    };


    const handleChange = (name, event) => {

        let from = { ...formData };

        from[name] = event;

        setFormData({ ...formData, ...from });

    }

    return (
        <Container fluid className='no-lr-p'>
            <AlertBox />
            <Row className='g-0'>
                <Col md={5} className="loginLImg">

                </Col>
                <Col md={7} sm={12}>
                    <div className="text-center otp-inner">
                        <div className='mb-4'>
                            <h1 className='Heading'>Verification code</h1>
                        </div>
                        <div className='mb-4'>
                            <p className='Text'>Please enter your code sent to </p>
                            {/* <p className='Text'>{state.email}</p> */}
                        </div>
                        <div>
                            <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                                <Form.Group controlId="formBasicEmail">
                                    <OtpInput value={formData.otp ? formData.otp : ""} onChange={e => handleChange('otp', e)} numInputs={6} className="optStyle" inputStyle={{
                                        borderRadius: "8px", border: "1px solid #FAFAFA",
                                        backgroundColor: "#FAFAFA", textAlign: "center"
                                    }}
                                        focusStyle={{
                                            border: "1px solid #CFD3DB",
                                            outline: "none"
                                        }} />
                                    <Form.Control.Feedback type="invalid" className='text-start'>Please Enter Number</Form.Control.Feedback>
                                </Form.Group>

                                {/* <Form.Group controlId="formBasicEmail">
                                    <OtpInput value={formData.otp ? formData.otp : ""} onChange={e => handleChange('otp', e)} numInputs={6}  containerStyle="containerStyle"  separator={<span style={{ width: "30px" }}></span>} inputStyle={{
                                        border: "1px solid #FAFAFA",  borderRadius: "8px", width: "80px",  height: "80px", 
                                        backgroundColor: "#FAFAFA", textAlign: "center", fontSize:"30px"
                                    }} focusStyle={{
                                        border: "1px solid #CFD3DB",
                                        outline: "none"
                                    }}  />
                                    <Form.Control.Feedback type="invalid" className='text-start'>Please Enter Number</Form.Control.Feedback>
                                </Form.Group> */}
                                <div className='mb-5 mt-4'>
                                    <p className='Textsm text-start'>Resent Code  </p>
                                </div>
                                <div className="d-grid col-12 mx-auto">
                                    <button className="btn LoginBtn" type="submit">Verify</button>
                                </div>
                                {/* <button type="submit" className="LoginBtn"> Request OTP </button> */}
                            </Form>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}

export default OtpVerify;