import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addProductToListAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import { useNavigate } from 'react-router-dom';

const AddProductToList = ({ list, id, getWishList }) => {

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

            let postData = { productId: id, listId: formData.listId }
            // console.log(postData);
            // // Here we call api
            let resp = await addProductToListAction(postData);
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
            <span className="btn text-white btn-success" title='Add to list' onClick={handleShow} ><FontAwesomeIcon icon={faPencil} /></span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product to Your List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} autoComplete="off" onSubmit={e => handleSubmit(e)}>
                        <Form.Select aria-label="Default select example" className="filedbg" value={formData.listId ? formData.listId : ""} onChange={e => handleChange('listId', e)} required>
                            <option value="">Select from option</option>
                            {list.length && list.map((list, index) => {
                                return <option value={list._id} key={index}>{list.name}</option>
                            })
                            }
                        </Form.Select>
                        <div className="d-grid col-12 mx-auto">
                            <button className="btn LoginBtn text-white mt-3" type="submit"> Confirm </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddProductToList;