
import { Row, Col } from 'react-bootstrap';

const AddressBlockL = ({item}) => {
    return (
        <>
            <Col md={12}>
                <Row>
                    <Col md={12}>
                        <p className='CartText'>{item.name},&nbsp;&nbsp; Phone Number: {item.phoneNumber}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p className='CartText'>{item.houseNumber},{item.streetAddess}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p className='CartText'>{item.city},{item.state}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p className='CartText'>{item.pinCode},{item.country}</p>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default AddressBlockL;