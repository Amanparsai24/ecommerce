import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';
import { Gender, checkMobileNumber } from "../../common/Constant";
import { profilePhotoAction, userListByIdAction } from "../../action/Front.action";
import Radiobtn from './Radiobtn';
import moment from 'moment';
const ProfilePage = () => {
    document.title = "Ecommerce - My Account";
    const loginUser = JSON.parse(localStorage.getItem('userData'));
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [isDisabled, setDisabled] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [type, setType] = useState('text');

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

            let resp = await profilePhotoAction(formData);
            if (resp.code === 200) {
                dispatch(setAlert({ open: true, severity: "success", msg: msg, type: '' }));
                setTimeout(() => {
                    getUserData();
                }, 3000);
            
            } else {

                var data = "";
                setDisabled(false);
                if (resp.error.fullName) {
                    data = resp.error.fullName;
                } else if (resp.error.mobileNumber) {
                    data = resp.error.mobileNumber;
                } else if (resp.error.gender) {
                    data = resp.error.gender;
                } else {
                    data = resp.error.dob;
                }
                dispatch(setAlert({ open: true, severity: "danger", msg: data, type: '' }));

            }
            return false;

        }
    };


    const getUserData = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await userListByIdAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setFormData(resp.data[0]);
        }
    }


    useEffect(() => {

        getUserData();

    }, []);

    console.log(formData.mobileNumber)
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
                                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" className='profile16'>  Name </Form.Label>
                                                        <Col sm="10">
                                                            <Form.Control type="text" className='profileInp' placeholder="e.g. Full Name" value={formData.fullName ? formData.fullName : ""} onChange={e => handleChange('fullName', e)} minLength="2" maxLength="128" required autoComplete="off" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" className='profile16'>  Mobile </Form.Label>
                                                        <Col sm="10">
                                                            <Form.Control type="number" className='profileInp' placeholder="e.g. 9876543210" value={formData.mobileNumber ? formData.mobileNumber : ""} onChange={e => handleChange('mobileNumber', e)} pattern="\d*" minLength="10" maxLength="12" required autoComplete="off" />
                                                            {formErrors["mobileNumber"] ?
                                                                <div className='error'>{formErrors["mobileNumber"]}</div>
                                                                : <div className='error'></div>
                                                            }
                                                        </Col>
                                                    </Form.Group>
                                                    <Row>
                                                        <Col lg={8}>
                                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                                <Form.Label column sm="3" className='profile16'>  Gender  </Form.Label>
                                                                <Col sm="9">
                                                                    {
                                                                        Gender.map((val, ind) => {
                                                                            return <Radiobtn key={ind}
                                                                                name={val.name}
                                                                                checked={(formData.gender && val.id === parseInt(formData.gender)) ? true : false}
                                                                                id={val.id}
                                                                                handleChange={e => handleChange('gender', e)}
                                                                            />
                                                                        })
                                                                    }
                                                                </Col>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Control placeholder="Date Of Birth"
                                                                    type={type}
                                                                    onFocus={() => setType('date')}
                                                                    onBlur={() => setType('text')}
                                                                    className='profileInp' value={formData.dob ? moment(formData.dob).format('Do MMM YYYY')  : ""} onChange={e => handleChange('dob', e)} autoComplete="off" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" className='profile16'>  Email </Form.Label>
                                                        <Col sm="10">
                                                            <Form.Control type="text" className='profileInp' value={loginUser[0].email}  autoComplete="off" disabled/>
                                                        </Col>
                                                    </Form.Group>
                                               
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