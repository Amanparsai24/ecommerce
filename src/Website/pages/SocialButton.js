
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
function SocialButton() {
    return (
        <div className='SocialButton'>
            <div className="social-signIcon">
                <span className="btn loginiconBorder social-signIcon fb-sign-icon"><FontAwesomeIcon icon={faGoogle} /></span>
                <span className="btn loginiconBorder social-signIcon fb-sign-icon"><FontAwesomeIcon icon={faFacebookF} /></span>
                <span className="btn loginiconBorder social-signIcon fb-sign-icon"><FontAwesomeIcon icon={faApple} /></span>
            </div>
        </div>
      
    );
}

export default SocialButton;