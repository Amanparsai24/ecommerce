
import { Row, Col, Container, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertBox from "../../components/AlertBox";
import Orders from './Orders';

const MyOrders = () => {
    return (
        <div className="Profile-Page">
            <Container >
                <Row >
                    <Container >
                        <AlertBox />
                        <Row className='mt-3 mb-3'>
                            <Col md={12}>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/" className='breadcrumbCS'>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/profile" className='breadcrumbCS'>My account</Link></li>
                                        <li className="breadcrumb-item  active" aria-current="page">My Orders</li>
                                    </ol>
                                </nav>
                                <p className='HomeblockCartBodyH1'>Your Orders</p>
                                <Tabs defaultActiveKey="orders" id="justify-tab-example" className="mb-3 FAQ-pills navbar-nav">
                                    <Tab eventKey="orders" title="Orders">
                                        <Orders />
                                    </Tab>
                                    <Tab eventKey="BuyAgain" title="Buy Again">
                             
                                    </Tab>
                                    <Tab eventKey="Notyetshipped" title="Not yet shipped">
                                    
                                    </Tab>
                                    <Tab eventKey="CancelledOrders" title="Cancelled Orders" >
                                    
                                    </Tab>
                                </Tabs>
                           
                            </Col>
                     
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default MyOrders;