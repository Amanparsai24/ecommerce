import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { productListAction, categoryListAction } from "../../action/Front.action";
import CommonListingPage from './CommonListingPage';
import { setAlert } from '../../slices/home';
import AlertBox from "../../components/AlertBox";
import { parentDefault } from "../../common/Constant";

const Product = (props) => {

    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const [formData, setFormData] = useState({ page: 0, limit: 6, });

    const getDataList = async () => {

        var resp = await categoryListAction({ status: 1 });
        if (resp.code === 200) {

            setCategoryList(resp.data)
        }

    }

    const getList = async (action = '') => {

        let filterData = { ...formData };
 
        if (action === 'clear') {

            filterData = { page: 0, limit: 6, sortName: "createdAt", soryBy: "DESC" };
            setFormData(filterData);
        }

        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await productListAction(filterData);
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setList(resp.data)
        }

    }

    const formHandler = (e, field) => {

        let data = { ...formData };
        if (e.target) {
            data[field] = e.target.value;
        } else {
            data[field] = e.value;
        }

        setFormData(data);
    }

    useEffect(() => {
        getList();
        getDataList();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row>
                    <Col md={3}>
                        <Card className='ProductFullCard'>
                            <Card.Body>
                                <p>Filter</p>
                                <Accordion defaultActiveKey="0" className='AccordionProduct'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className='HomeSerH'>Category</Accordion.Header>
                                        <Accordion.Body>
                                            
                                            {categoryList.map((item, index) => {
                                                if (item.parentId === parentDefault) {
                                                    let check = formData.category && formData.category.length && formData.category.includes(item._id) ? true : false;
                                                    return <Form.Check type="checkbox" id="custom-switch" label={item.name} value={item._id} key={index} onChange={e => formHandler(e, 'category', 'checkbox')} checked={check} />
                                                } else { return ''; }
                                            })}

                                            {/* <div className="form-check">
                    
                                                <input className="form-check-input" type="checkbox" value="" onChange={e => formHandler(e, 'categoryId', 'checkbox')} id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault"> Clothing </label>
                                            </div> */}
                                            {/* <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" onChange={e => formHandler(e, 'categoryId', 'checkbox')} id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault"> women </label>
                                            </div> */}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Price</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row mb-2">
                                                <div className="col ">
                                                    <input type="range" min="1" max="100" className="slider" value="50" onChange={e => formHandler(e, 'categoryId', 'checkbox')} />
                                                </div>
                                            </div>
                                           
                                            <div className="row">
                                                <div className="col">
                                                    <select id="inputState" className="form-select">
                                                        {/* <option selected>Min...</option>
                                                        <option>...</option> */}
                                                    </select>
                                                </div>
                                                to
                                                <div className="col">
                                                    <select id="inputState" className="form-select">
                                                        {/* <option selected>Max...</option>
                                                        <option>...</option> */}
                                                    </select>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Western Wear</Accordion.Header>
                                        <Accordion.Body>
                                       
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Customer Ratings</Accordion.Header>
                                        <Accordion.Body>
                                       
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Size</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Color</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Discount</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Fabric</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Collar</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Card className='ProductFullCard'>
                            <Card.Body className='p-4'>
                                <nav aria-label="breadcrumb mb-2">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Clothing</Link></li>
                                        <li className="breadcrumb-item active " aria-current="page">Western wear</li>
                                    </ol>
                                </nav>
                                <p className='ProductH'>Western Wear</p>
                                <Row>
                                    <CommonListingPage getList={e => getList()} {...props} list={list} />
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Product;