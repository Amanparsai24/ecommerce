
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Rating() {
    return (
        <div className="header-Icon">
            <span className="btn text-warning"><FontAwesomeIcon icon={faStar} /></span>
            <span className="btn text-warning"><FontAwesomeIcon icon={faStar} /></span>
            <span className="btn text-warning"><FontAwesomeIcon icon={faStar} /></span>
            <span className="btn text-warning"><FontAwesomeIcon icon={faStar} /></span>
            <span className="btn text-warning"><FontAwesomeIcon icon={faStar} /></span>
        </div>
    );
}

export default Rating;