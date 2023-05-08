import React, { useState , useRef } from 'react';
import {  Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faDownload } from '@fortawesome/free-solid-svg-icons';
import InvoicePage from '../component/InvoicePage';
import { useReactToPrint } from 'react-to-print';

const Invoice = ({item}) => {

    const componentPdf = useRef();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [formData, setFormData] = useState(() => {
    //     const orderdetails = JSON.parse(localStorage.getItem('orderdetails'));
    //     return orderdetails || null;
    // });

    const downloadPdf = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle:"pdf",
        // onAfterPrint:()=>alert("Data saved in Pdf"),
    })

    return (
        <>
            <Button className='wishListBtn text-white border-0'  onClick={handleShow}>
                <FontAwesomeIcon icon={faDownload} />
            </Button>
            {/* <span className="btn wishListBtn text-white" onClick={handleShow}> */}
            <Modal show={show} size="xl" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div ref={componentPdf}  >
                        <InvoicePage item={item} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className='wishListBtn text-white border-0' onClick={e => downloadPdf()}>
                        Download Invoice
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Invoice;