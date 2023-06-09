
import { Row, Col, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons';

function Delivery() {
    return (
        <div className="Delivery">
            <Row>
                <Col sm={4} md={4} lg={2}>
                    <p className="btn btn-outline-dark border-1 text-dark" style={{ marginLeft: '2rem' }}><FontAwesomeIcon icon={faTruck} /></p>
                    <p className='text-center smRes'>Free Delivery</p>
                </Col>
                <Col sm={4} md={4} lg={2}>
                    <p className="btn btn-outline-dark border-1 text-dark" style={{ marginLeft: '2rem' }}><FontAwesomeIcon icon={faTruck} /></p>
                    <p className='text-center smRes'>Free Delivery</p>
                </Col>
                <Col sm={4} md={4} lg={2}>
                    <p className="btn btn-outline-dark border-1 text-dark" style={{ marginLeft: '2rem' }}><FontAwesomeIcon icon={faTruck} /></p>
                    <p className='text-center smRes'>Free Delivery</p>
                </Col>
            </Row>
        </div>
    );
}

export default Delivery;