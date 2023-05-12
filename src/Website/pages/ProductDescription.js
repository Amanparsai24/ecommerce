import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

const ProductDescription = ({ properties }) => {
    // console.log(properties)
    return (
        <div className="ProductDescription">
            {properties.length > 0 && properties.map(properties => (
                <Fragment key={properties.key}>
                    <Row>
                        <Col md={4}>
                            <p className='ProductPrice'>{properties.key}</p>
                            </Col>
                            <Col md={8}>
                            <p className='ProductPrice'>{properties.value}</p>
                        </Col>
                    </Row>
                </Fragment>
            ))}
        </div>
    );
}

export default ProductDescription;