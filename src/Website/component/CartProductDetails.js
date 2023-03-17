import { Link } from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const CartProductDetails = ({ item }) => {

    return (
        <>
            <p className='ProductH'>{item.brand ? item.brand.name : ""}</p>
            <p className='ProductPrice'>{item.name}</p>
            <Row>
                <Col md={3}>
                    <p className='breadcrumbCS'>Size : M</p>
                </Col>
                <Col md={7}>
                    <p className='breadcrumbCS'>Color : Green</p>
                </Col>
            </Row>
            <p className='ProductH'>
                <span className='CartText'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' />&nbsp;</span>{item ? item.salePrice : ""}
                
               <del className='ProductPrice'>{item ? item.MRP : ""}</del> 

                &nbsp;  <span className='text-success'>{item.offers}% off </span>  
                
                &nbsp; <span className='breadcrumbCS'>1 Offer Applied</span> 

            </p>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                <label className="form-check-label breadcrumbCS" htmlFor="flexCheckIndeterminate">
                    This will be a gift  &nbsp; <Link className='text-decoration-none'> Learn More</Link>
                </label>
            </div>
        </>
    );
}

export default CartProductDetails;