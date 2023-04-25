import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

const ProductDescription = ({ properties }) => {
    return (
        <div className="ProductDescription">
            {properties.map(properties => (
                <Fragment key={properties.key}>
                    <Row>
                        <Col md={6}>
                            <p className='ProductPrice'>{properties.key}</p>
                            </Col>
                            <Col md={6}>
                            <p className='ProductPrice'>{properties.value}</p>
                        </Col>
                    </Row>
                </Fragment>
            ))}
        </div>
    );
}

export default ProductDescription;