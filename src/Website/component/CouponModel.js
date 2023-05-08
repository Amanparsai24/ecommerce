import React, { useState, useEffect, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { checkCouponAction, getdiscountAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import { useDispatch } from 'react-redux';

const CouponModel = ({ handleClose }) => {

    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({});
    const [coupondata, setCouponData] = useState({});
    const [discountList, setDiscountList] = useState({});

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
        
            let postData = { products: productdata, code: formData.code }
            let resp = await checkCouponAction(postData);
            if (resp.code === 200) {
                dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));
                let data = { ...formData, couponName: resp.couponName ,couponDiscount: resp.couponDiscount, amount: resp.amount, discount: resp.discount, totalAmount: resp.totalAmount };
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

    // const handleChange = (name, event) => {

    //     let from = { ...formData };
    
    //     from[name] = event.target.value;

    //     setFormData({ ...formData, ...from });

    // }

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

    const getdiscountList = async () => {

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await getdiscountAction();
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setDiscountList(resp.data);
        }
    }

    useEffect(() => {
        getdiscountList();   
    }, []);

    return (
        <>
        
            <Modal.Header closeButton>
                <Modal.Title className='CouponModelh'>Apply Coupon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 postion-absolute">
                    <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Coupon Code" value={formData.code ? formData.code : ""} className="form-control CouponModelsmT" onChange={e => handleChange('code', e)} required autoComplete="off" />
                        
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Code.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='CHECK text-decoration-none border-0' type="submit">CHECK</Button>
                    </Form>
                </div>
                <div className='couponblockScroll'>
                    {
                        discountList && discountList.length > 0 && discountList.map((item, ind) => {
                            console.log(item);
                            let checked = (formData.code && formData.code === item.code) ? true : false;
                            return <Fragment key={ind}>
                                <Row className='mb-4'>
                                    <Col md={1}>
                                        <Form.Check type="radio" aria-label="radio 1" id="custom-switch" value={item.code} onChange={e => handleChange(e, 'code')} checked={checked} />
                                    </Col>
                                    <Col md={10}>
                                        <div className='CouponDisblockPos mb-2'> {item.code} </div>
                                        <span className='text-start breadcrumbCS'>Save {item.value}</span><br></br>
                                        <span className='text-start breadcrumbCS'>{item.value} off on minimum purchase of {item.minPurchase} to {item.maxPurchase}  </span><br></br>
                                        <span className='text-start breadcrumbCS'>Expires on : 21 February 2023     11:59 PM</span>
                                    </Col>
                                </Row>
                            </Fragment>
                        })

                    }
                </div>
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