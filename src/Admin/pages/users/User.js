import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../slices/home';
import UsersListing from "./UsersListing";
import Pagination from "../../../components/Pagination";
import { userListAction } from "../../../action/Admin.action";

const User = (props) => {

    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [formData, setFormData] = useState({ page: 0, limit: 2, sortName: "createdAt", soryBy: "DESC" });

    const getUserList = async (action = '') => {

        let filterData = { ...formData };
        if (action === 'clear') {
            filterData = { page: 0, limit: 5, sortName: "createdAt", soryBy: "DESC" };
            setFormData(filterData);
        }

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await userListAction(filterData);
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setUserList(resp.data);
            setTotalCount(resp.count);
        }

    }


    const formHandler = (e, field) => {

        let data = { ...formData };
        if (e.target) {
            data[field] = e.target.value;
        } else {
            data[field] = e;
        }
        setFormData(data);
    }

    useEffect(() => {

        getUserList();

    }, [formData]);

    return (
        <div className="Users">
            <Row className="mb-3">
                <Form>
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">Start Date</Form.Label>
                                        <Form.Control type="date" className="inputFieldbg" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">End Date</Form.Label>
                                        <Form.Control type="date" className="inputFieldbg" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">User Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" className="inputFieldbg" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">Roles</Form.Label>
                                        <Form.Select aria-label="Default select example" className="inputFieldbg">
                                            <option>select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">State</Form.Label>
                                        <Form.Select aria-label="Default select example" className="inputFieldbg">
                                            <option>select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">City</Form.Label>
                                        <Form.Select aria-label="Default select example" className="inputFieldbg">
                                            <option>select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="F14 Grey">Select Status</Form.Label>
                                        <Form.Select aria-label="Default select example" className="inputFieldbg">
                                            <option>select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={3} className="mt-3">
                                    <p></p>
                                    <div className="d-grid mx-auto">
                                        <Link className="btn SubmitBtn text-white" to="#" type="submit">Submit</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <UsersListing {...props} userList={userList} formData={formData} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <Pagination 
                        totalCount={totalCount}
                        formData={formData}
                        formHandler={formHandler}
                        setFormData={setFormData} />
                </Col>
            </Row>
           
        </div >
    );
}

export default User;