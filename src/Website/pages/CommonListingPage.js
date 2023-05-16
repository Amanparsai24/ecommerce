
import { useNavigate, Link } from 'react-router-dom';
import React, {Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { imgPath } from "../../common/Function";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CommonListingPage = (props) => {

    const navigate = useNavigate();

    const ViewProduct = (item) => {
        // console.log(item)
        // localStorage.setItem("productDetails", JSON.stringify(item));
        setTimeout(() => {
            navigate('/productdetails?a=' + item._id, { state: item });
        }, 1);
    } 
    
    return (
        <>
            {props.list && props.list.length > 0 && props.list.map((item, ind) => {
                // console.log(item);
                return <Col sm={12} md={12} lg={3} key={ind}>
                    {/* emulateTouch={true} autoPlay={5000} infiniteLoop={true} */}
                    <Card className='ProductCard mb-2' onClick={e => ViewProduct(item)}>
                        <Carousel showArrows={false} transitionTime={500} autoPlay={5000} showThumbs={false} showStatus={false}>
                            {item.colors[0].images && item.colors[0].images[0] && item.colors[0].images.map((item, ind) => {
                                return <Fragment key={ind}>
                                    <div >
                                        <img src={imgPath(item)}  className="card-img-top ProductImg" alt="..." />
                                    </div>
                                </Fragment>
                            })
                            }
                        </Carousel>
                        {/* <img src={imgPath(item.colors[0].images[0])} className="card-img-top ProductImg" onClick={e => ViewProduct(item)} alt="..." /> */}
                        <div className='position-absolute'>
                            <span className="btn text-dark heartPos"><FontAwesomeIcon icon={faHeart} /></span>
                            <span className="btn text-dark heartPos"><FontAwesomeIcon icon={faShareNodes} /></span>
                        </div>
                        <Card.Body>
                            <Row className='justify-content-center'>
                                <Col xs={4} lg={6}>
                                    {item && item.colors && item.colors.length > 0 && item.colors.map((item, ind) => {
                                        return <Fragment key={ind}>
                                            <span className='commoncolorBtnBor'>
                                                <button className='rounded-circle btn btn-md commoncolorBtn' style={{ backgroundColor: `${item.colorId.code}` }} type="button"></button>
                                            </span>{' '}
                                      
                                        </Fragment>
                                    })
                                    }
                                </Col>
                            </Row>
                            <p className='ProductH '> {item.brand ? item.brand.name : ""}</p>
                            <p className='ProductPrice ProductNameCss  col-12 text-truncate'>{item.name}</p>
                            <p className='ProductH'><span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{item.salePrice} 
                            <del className='ProductPrice'>{item.MRP} </del> 
                            <span className='text-success'>{item.offers}% off</span></p>
                        </Card.Body>
                    </Card>
                </Col>
            })}
        </>

    );
}

export default CommonListingPage;
