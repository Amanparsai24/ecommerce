import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { QuantityPicker } from 'react-qty-picker';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../slices/home';
import { updateQuantityAction } from "../../action/Front.action";

const QuantityModel = ({ item, getcartlist, gettotalprice }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({});

    const getPickerValue = (value) => {
        setFormData(value);
    }

    const selectQuantity = async () => {
        let resp = await updateQuantityAction(formData);
        if (resp.code === 200) {
            const cartlist = JSON.parse(localStorage.getItem('cartlist'));
            for (let i in cartlist) {
                let productid = cartlist[i]._id;

                if (productid === resp.data.productId) {
                    cartlist[i]['productqyt'] = resp.data.quantity;
                    cartlist[i]['salePrice'] = resp.data.salePrice;
                    cartlist[i]['MRP'] = resp.data.MRP;
                    cartlist[i]['discount'] = resp.data.discount;
                    localStorage.setItem("cartlist", JSON.stringify(cartlist));
                    getcartlist();
                    gettotalprice();
                }
                // window.location.reload(false);
            }
        } else {
            dispatch(setAlert({ open: true, severity: "danger", msg: resp.msg, type: '' }));
        }
        handleClose();
    }

    // useEffect(() => {

    //     gettotalprice();

    // }, [formData]);

    return (
        <>
            <Button className="btn btn-sm qytBtn text-dark mt-2" onClick={handleShow} >
                Qty : &nbsp;{item.productqyt}  <FontAwesomeIcon icon={faAngleDown} />
            </Button>
            <Modal show={show} size="sm" onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='CouponModelh'>Product Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <QuantityPicker min={1} value={item.productqyt} onChange={e => getPickerValue({ quantity: e, productId: item._id })} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-grid col-12 mx-auto">
                        <button className="btn LoginBtn text-white" type="submit" onClick={selectQuantity}>Done</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default QuantityModel;