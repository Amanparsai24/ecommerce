import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from '../component/Carousel';
import CommonList from '../component/CommonList';

function Homeold() {
    return (
        <div className="Homeold">
            <Carousel />
            <Container fluid>
                <Row className='DealCard'>
                    <Container className=''>
                        <Row className='p-4'>
                            <Col sm={5} md={3}>
                                <h2 className='HH'>Deal of the day </h2>
                            </Col>
                            <Col sm={7} md={9}>
                                <Link className='text-decoration-none viewM text-start'>View more</Link>
                            </Col>
                            <Col md={12}>
                                <CommonList />
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        
         
        </div>
    );
}

export default Homeold;