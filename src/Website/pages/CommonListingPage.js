
import { useNavigate } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { imgPath } from "../../common/Function";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const CommonListingPage = (props) => {

    const navigate = useNavigate();

    const ViewProduct = (item) => {
        localStorage.setItem("productDetails", JSON.stringify(item));
        setTimeout(() => {
            navigate('/productdetails');
        }, 1);
    } 
    
    return (
        <>
            {props.list && props.list.length > 0 && props.list.map((item, ind) => {
                // console.log(item);
                return <Col sm={12} md={12} lg={3} key={ind}>
                    <Card className='ProductCard mb-2'>
                        <img src={imgPath(item.image[0])} className="card-img-top ProductImg" onClick={e => ViewProduct(item)} alt="..." />
                        <div className='position-absolute'>
                            <span className="btn text-dark heartPos"><FontAwesomeIcon icon={faHeart} /></span>
                            <span className="btn text-dark heartPos"><FontAwesomeIcon icon={faShareNodes} /></span>
                        </div>
                        <Card.Body>
                            <p className='ProductH'> {item.brand ? item.brand.name : ""}</p>
                            <p className='ProductPrice ProductNameCss '>{item.name}</p>
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
