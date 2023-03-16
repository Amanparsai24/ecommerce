import { Row, Col, Container, Card } from 'react-bootstrap';
import image01 from "../../images/Rectangle821.png";
import image02 from "../../images/Rectangle 824.png";
import image03 from "../../images/Rectangle 822.png";
import image04 from "../../images/Rectangle 825.png";
import image05 from "../../images/Rectangle 823.png";
import image06 from "../../images/Rectangle 826.png";

function Block3() {
    return (
        <Container className='g-0 '>
            <Row className='g-0'>
                <Col sm={12} md={12} className="mb-4">
                    <Row>
                        <Col sm={12} md={3}>
                            <Card className='HomeblockCart mb-4'>
                                <img src={image01} className="card-img-top MultiImg" alt="..." />
                                <div className='HomeblockCartBody'>
                                    <p className='HomeblockCartBodyH text-center'>Anaarkali Suit</p>
                                </div>
                            </Card>
                            <Card className='HomeblockCart'>
                                <img src={image02} className="card-img-top MultiImg" alt="..." />
                                <div className='HomeblockCartBody'>
                                    <p className='HomeblockCartBodyH text-center'>
                                        Stiched Saree</p>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className='Homeblock1 mb-5'>
                                <h1 className='Homeblock1hT text-center'>Shop By Categories</h1>
                            </div>
                            <Row>
                                <Col sm={12} md={6}>
                                    <Card className='HomeblockCart'>
                                        <p className='HomeblockCartBodyH1 text-center'>Traditional Kurtas</p>
                                        <img src={image05} className="card-img-top MultiImg1" alt="..." />
                                    </Card>
                                </Col>
                                <Col sm={12} md={6}>
                                    <Card className='HomeblockCart'>
                                        <img src={image06} className="card-img-top MultiImg1" alt="..." />
                                        <p className='HomeblockCartBodyH1 text-center'>Emroided Saree</p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={3}>
                            <Card className='HomeblockCart mb-4'>
                                <img src={image03} className="card-img-top MultiImg" alt="..." />
                                <div className='HomeblockCartBody'>
                                    <p className='HomeblockCartBodyH text-center'>Straight Suit</p>
                                </div>
                            </Card>
                            <Card className='HomeblockCart'>
                                <img src={image04} className="card-img-top MultiImg" alt="..." />
                                <div className='HomeblockCartBody'>
                                    <p className='HomeblockCartBodyH text-center'>Pre Stiched Saree</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Block3;