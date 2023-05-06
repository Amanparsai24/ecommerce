import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { checkCouponAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import { useDispatch } from 'react-redux';

const CouponModel = ({ handleClose }) => {

    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({});
    const [coupondata, setCouponData] = useState({});

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
            const cartlist = JSON.parse(localStorage.getItem('cartlist'));
            var productdata = [];
            for (let i in cartlist) {
                let row = cartlist[i];
                productdata.push({ productId: row._id, quantity: row.productqyt });
            }
        
            let postData = { products: productdata, couponCode: formData.couponName }
            let resp = await checkCouponAction(postData);
            if (resp.code === 200) {
                dispatch(setAlert({ open: true, severity: "success", msg: "Success", type: '' }));
                let data = { ...formData, couponDiscount: resp.couponDiscount, amount: resp.amount, discount: resp.discount, totalAmount: resp.totalAmount };
                setCouponData(data);

            }else {
                setDisabled(false);
                dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
            }
            return false;
        }   
     
    }

    const apply = () => {
        var cartData = [];
        if (coupondata){
            cartData.push(coupondata);
        }
        localStorage.setItem('purchaseData', JSON.stringify(coupondata));
        dispatch(setAlert({ open: true, severity: "success", msg: "Coupon Amount Apply It Added on next Page", type: '' }));
        handleClose();
    }

    const handleChange = (name, event) => {

        let from = { ...formData };
    
        from[name] = event.target.value;

        setFormData({ ...formData, ...from });

    }

    return (
        <>
        
            <Modal.Header closeButton>
                <Modal.Title className='CouponModelh'>Apply Coupon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 postion-absolute">
                    <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Coupon Code" value={formData.couponName ? formData.couponName : ""} className="form-control CouponModelsmT" onChange={e => handleChange('couponName', e)} required autoComplete="off" />
                        
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Code.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='CHECK text-decoration-none border-0' type="submit">CHECK</Button>
                    </Form>
                </div>
                <Row className='mt-3'>
                    <Col md={4} lg={2}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </Col>
                    <Col md={4} lg={10}>
                        <div className='CouponDisblockPos mb-2'>  MDFH20 </div>
                        <span className='text-start breadcrumbCS'>Save $20</span><br></br>
                        <span className='text-start breadcrumbCS'>$20 off on minimum purchase of $500</span><br></br>
                        <span className='text-start breadcrumbCS'>Expires on : 21 February 2023     11:59 PM</span>
                    </Col>
                </Row>
                <hr></hr>
                <Row className='mt-3'>
                    <Col md={4} lg={4} >
                        <div className="CouponDisText">
                            Discount<br></br>
                            $ {coupondata.couponDiscount ?coupondata.couponDiscount:0}
                        </div>
                    </Col>
                    <Col md={4} lg={8}>
                        <div className="d-grid  mx-auto">
                            <button className="btn LoginBtn text-dark " type="button" onClick={apply} >Apply</button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </>
    );
}

export default CouponModel;