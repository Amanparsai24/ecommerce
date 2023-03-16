import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="Footer">
            <div className="container">
                <footer className="p-5">
                    <div className="row">
                        <div className="col-3">
                            <h5 className="FooterH" >About</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item  mb-2"><Link to="/contactus" className="nav-link p-0 FooterT"> Contact Us</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT">  About Us</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT"> Press</Link></li>
                            </ul>
                        </div>

                        <div className="col-3">
                            <h5 className="FooterH">Help</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item  mb-2"><Link to="#" className="nav-link p-0 FooterT"> Payments</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT">  Shipping</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT"> Cancellation and returns</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT"> FAQ</Link></li>
                            </ul>
                        </div>

                        <div className="col-3">
                            <h5 className="FooterH">Policy</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item  mb-2"><Link to="#" className="nav-link p-0 FooterT"> Return Policy</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT">  Terms Of Use</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT"> Security</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT"> Privacy</Link></li>
                            </ul>
                        </div>
                
                        <div className="col-3">
                            <h5 className="FooterH">Social</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item  mb-2"><Link to="#" className="nav-link p-0 FooterT"> Facebook</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT">  Instagram</Link></li>
                                <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 FooterT"> Twitter</Link></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;