import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="PageNotFound">
            <Container>
                <Row className='mb-2 justify-content-center'>
                    <Col xs={12} md={12} lg={8}>
                        <div className='mt-3'>
                            <Card className='text-center cardH'>
                                <Card.Body>
                                    <Card.Title className='HH'>We are sorry - this page is not here anymore</Card.Title>
                                    <Card.Text className='Textsm'> Error 404 - Page not found</Card.Text>
                                    <Link className='btn LoginBtn' to="/">Go To HomePage</Link>
                                </Card.Body>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PageNotFound;