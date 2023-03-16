import { Row, Col } from 'react-bootstrap';

function CustomerReviews() {

    return (
        <div className="ProductDescription">
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Customer Reviews </p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>16 X 12 X 5 cm , 250gm</p>
                </Col>
            </Row>
        </div>
    );
}

export default CustomerReviews;