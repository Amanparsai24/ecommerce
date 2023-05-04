import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { productListAction, categoryListAction, brandListAction, colorListAction, sizeListAction } from "../../action/Front.action";
import CommonListingPage from './CommonListingPage';
import { setAlert } from '../../slices/home';
import AlertBox from "../../components/AlertBox";
import { parentDefault } from "../../common/Constant";

const Product = (props) => {

    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [sizeList, setsizeList] = useState([]);
    const [formData, setFormData] = useState({ page: 0, limit: 10 });

    const getDataList = async () => {

        var resp = await categoryListAction();
        if (resp.code === 200) {

            setCategoryList(resp.data)
        }

        resp = await brandListAction();
        if (resp.code === 200) {

            setBrandList(resp.data)
        }

        resp = await colorListAction();
        if (resp.code === 200) {

            setColorList(resp.data)
        }

        resp = await sizeListAction();
        if (resp.code === 200) {

            setsizeList(resp.data)
        }

    }

    const getList = async (action = '') => {

        let filterData = { ...formData };

        if (action === 'clear') {

            filterData = { page: 0, limit: 10, sortName: "createdAt", soryBy: "DESC" };
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
    }, [formData]);

    return (
        <div className="Product">
            <Container fluid>
                <AlertBox />
                <Row>
                    <Col sm={12} md={4} lg={3}>
                        <Card className='ProductFullCard mt-4 mb-4'>
                            <Card.Body>
                                <p className='ProductName'>Filter</p>
                                <Row className='filterb'>
                                    <Col xs={7} lg={7}>
                                        <Card.Body>
                                            <small className="text-muted">{Object.keys(formData).length} filter applied</small>
                                        </Card.Body>
                                    </Col>
                                    <Col xs={5} lg={5}>
                                        <Card.Body className="text-end">
                                            <Link className="clearall" to="#" onClick={e => getList('clear')}>Clear All</Link>
                                        </Card.Body>
                                    </Col>
                                </Row>

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
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Price</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                <div className="col">
                                                    <select id="inputState" className="form-select filedbg" aria-label="Default select example" onChange={e => formHandler(e, 'minPrice')} value={formData.minPrice ? formData.minPrice : ""}>
                                                        <option >Min...</option>
                                                        <option value="100">100</option>
                                                        <option value="500">500</option>
                                                        <option value="1000">1000</option>
                                                    </select>
                                                </div>
                                                to
                                                <div className="col">
                                                    <select id="inputState" className="form-select filedbg" aria-label="Default select example" onChange={e => formHandler(e, 'maxPrice')} value={formData.maxPrice ? formData.maxPrice : ""}>
                                                        <option >Max...</option>
                                                        <option value="500">500</option>
                                                        <option value="1000">1000</option>
                                                        <option value="5000">5000</option>
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

                                            {sizeList.map((item, index) => {
                                                let check = formData.sizeId && formData.sizeId.length && formData.sizeId.includes(item._id) ? true : false;
                                                return <Form.Check type="checkbox" id="custom-switch" label={item.name} value={item._id} key={index} onChange={e => formHandler(e, 'sizeId', 'checkbox')} checked={check} />

                                            })}

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Color</Accordion.Header>
                                        <Accordion.Body>

                                            {colorList.map((item, index) => {
                                                let check = formData.colorId && formData.colorId.length && formData.colorId.includes(item._id) ? true : false;
                                                return <Form.Check type="checkbox" id="custom-switch" label={item.name} value={item._id} key={index} onChange={e => formHandler(e, 'colorId', 'checkbox')} checked={check} />

                                            })}

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Discount</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Brand</Accordion.Header>
                                        <Accordion.Body>

                                            {brandList.map((item, index) => {
                                                let check = formData.brandId && formData.brandId.length && formData.brandId.includes(item._id) ? true : false;
                                                return <Form.Check type="checkbox" id="custom-switch" label={item.name} value={item._id} key={index} onChange={e => formHandler(e, 'brandId', 'checkbox')} checked={check} />

                                            })}

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* <Accordion.Item eventKey="7">
                                        <Accordion.Header>Fabric</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Collar</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item> */}
                                </Accordion>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} md={8} lg={9}>
                        <Card className='ProductFullCard mt-4 mb-4'>
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