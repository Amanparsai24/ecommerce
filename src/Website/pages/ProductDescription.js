import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

const ProductDescription = ({ properties }) => {
    console.log(properties);
    // let data = Object.entries(properties);
    // console.log(data);
    return (
        <div className="ProductDescription">
            {properties.map((key, val) => {
                console.log(key);
                return <Fragment key={val}>
                    <Row>
                        {/* <Col md={6}>
                                <p className='ProductPrice'>{key}</p>
                        </Col>
                        <Col md={6}>
                                <p className='ProductPrice'>{val}</p>
                        </Col> */}
                    </Row>
                </Fragment>
            })}
            {/* <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Country of Origin</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>India</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Color</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Mauve</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Length</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Midi</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Fabric</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Georgette</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Pattern</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Solid</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Type</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Sheath</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Style Code</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>MB-115</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Sleeve Length</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Long Sleeves</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Occasion</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Party</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Knit or Woven</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Woven</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Neck</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Sweetheart Neck</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Sleeve Styling</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Puff Sleeves</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Lining Material</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Has a lining</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Closure</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Concealed Zip</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <p className='ProductPrice'>Material Care</p>
                </Col>
                <Col md={6}>
                    <p className='ProductPrice'>Poly Georgette, Hand Wash</p>
                </Col>
            </Row> */}
        </div>
    );
}

export default ProductDescription;