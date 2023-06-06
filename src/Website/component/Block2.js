import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductImg1 from "../../images/Rectangle1.png";
import ProductImg2 from "../../images/Rectangle2.png";
import ProductImg3 from "../../images/Rectangle3.png";
function Block2() {
    return (
        <Container className='g-0 '>
            <Row className='g-0'>
                <Col sm={12} md={12} lg={12} className="mb-4">
                    <div className='Homeblock1'>
                        <h1 className='Homeblock1hT text-center'>Shop By Occasion</h1>
                    </div>
                </Col>
                <Col sm={12} md={12} className="mb-4">
                    <Row>
                        <Col sm={12} md={4}>
                            <Card className='HomeblockCart mb-2'>
                                <img src={ProductImg3} className="card-img-top" alt="..." />
                            </Card>
                        </Col>
                        <Col sm={12} md={4}>
                            <Card className='HomeblockCart mb-2'>
                                <Link className='text-decoration-none text-dark' to="/product"><img src={ProductImg2} className="card-img-top" alt="..." /> 
                                    <div className='Homeblock2CartBody'>
                                        <p className='Homeblock1hT text-center'> New Arrival</p>

                                        <p className='HHBlock2 text-center'> Ethnic Wear</p>
                                    </div>
                                </Link>
                            </Card>
                        </Col>
                        <Col sm={12} md={4}>
                            <Card className='HomeblockCart mb-2'>
                                <img src={ProductImg1} className="card-img-top" alt="..." />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Block2;