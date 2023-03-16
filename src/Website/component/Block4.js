import { Row, Col, Container } from 'react-bootstrap';
import image00 from "../../images/image00.png";

function Block4() {
    return (
        <Container fluid className='g-0'>
            <Row>
                <Col sm={12} md={12}>
                    <img src={image00} className="card-img-top HomeBlockFullimg" alt="..." />
                    <div className='Homeblock4'>
                        <h1 className='HH1 text-center text-white'>FLAT</h1>
                        <h1 className='HDH text-center text-white'>50% OFF</h1>
                        <div className="d-grid col-4 mx-auto">
                            <button className="btn LoginBtn text-white " type="submit"> Shop Now</button>
                        </div>
                    </div>
                    <div className='Homeblock4Second'>
                        <h1 className='HH text-center text-white'>Designer’s </h1>
                        <h1 className='HH text-center text-white'>Collection </h1>
                        <p className='hTblock4 text-center  text-white'>Lorem ipsum dolor sit amet consectetur.  </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Block4;