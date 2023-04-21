import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form } from "react-bootstrap";
import { LimitNumber } from "../common/Constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalCount, formData, formHandler, setFormData }) => {
    // Pagination logic
    const totalPages = Math.ceil(totalCount / formData.limit);
    const [currentPage, setCurrentPage] = useState(0);

    // console.log(currentPage);
    // console.log(totalPages);
    const handlePrevious = () => {

        if (formData.page === 0) {
            setCurrentPage(formData.page - 1);
            formHandler(formData.page, 'page');
        } else {
            formHandler(formData.page - 1, 'page');
            setCurrentPage(formData.page - 1);
        }
    }

    const handleNext = () => {

        if (formData.page === totalPages) {
            formHandler(formData.page, 'page');
            setCurrentPage(formData.page);
        } else {
            formHandler(formData.page + 1, 'page');
            setCurrentPage(formData.page + 1);
        }
    }

    const handlePageClick = (newPage) => {
        formData.page = (newPage + 1);
        setFormData(formData.page);
        formHandler(formData.page, 'page');
    }

    const showData = (e) => {
        formHandler(e, 'limit');
    }

    return (
        <>
            <Row>
                 {/* <Col xs={12} lg={2}>
                    <div>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                                Limit
                            </Form.Label>
                            <Col sm="9">
                                <select className="form-select" aria-label="Default select example" onChange={e => showData(e,)} value={formData.limit ? formData.limit : ""} >
                                    <option>{formData.limit}</option>
                                    {LimitNumber.map((pageSize) => {
                                        return <option value={pageSize} key={pageSize}> {pageSize} </option>
                                    })}
                                </select>
                            </Col>
                        </Form.Group>
                    </div>
                </Col> */}
                <Col xs={12} lg={12}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={currentPage === 0 ? 'page-item disabled' : 'page-item '}>
                                <Link className="page-link " to="#" onClick={() => handlePrevious()} ><FontAwesomeIcon icon={faChevronLeft} size='sm' />&nbsp; Previous</Link>
                            </li>

                            {totalPages > 0 &&
                                [...Array(totalPages)].map((val, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <li className="page-item" key={index}><Link className={currentPage === index ? 'page-link active' : 'page-link'} key={val} onClick={() => handlePageClick(index)}  >{index + 1} </Link></li>
                                        </Fragment>
                                    )
                                })
                            }

                            <li className={currentPage === totalPages - 1 ? 'page-item disabled' : 'page-item '}>
                                <Link className="page-link" to="#" onClick={() => handleNext()} >Next <FontAwesomeIcon icon={faChevronRight} size='sm' />&nbsp;</Link>
                            </li>

                        </ul>
                    </nav>
                </Col>
            </Row>

        </>
    );
}

export default Pagination;