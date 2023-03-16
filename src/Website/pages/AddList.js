import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { AddlistAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import { useNavigate } from 'react-router-dom';

const AddList = ({ getWishList }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [validated, setValidated] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    
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
            let resp = await AddlistAction(formData);
            if (resp.code === 200) {
                dispatch(setAlert({ open: true, severity: "success", msg: resp.msg, type: '' }));
                getWishList();
                handleClose();
            } else {
                setDisabled(false);
                dispatch(setAlert({ open: true, severity: "danger", msg:resp.msg, type: '' }));
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
        <>
            <Link to="#" className="btn btn-sm wishListBtn text-white mt-2" onClick={handleShow} >
                <FontAwesomeIcon icon={faPlus} />&nbsp; Add list
            </Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Your Personal List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" className="form-control loginInp text-start" placeholder='Enter List Name' value={formData.name ? formData.name : ""} onChange={e => handleChange('name', e)} required />
                            <Form.Control.Feedback type="invalid" className='text-start'>Please Enter name</Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid col-12 mx-auto">
                            <button className="btn LoginBtn text-white mt-3" type="submit"> Confirm </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddList;