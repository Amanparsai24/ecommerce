import { Link } from "react-router-dom";

function AdminHeader() {

    return (
        <header id="header" className="ecom-header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logoAdmin d-flex align-items-center">
                    <span className="d-lg-block">E-commerce</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>
        </header>
    );
}

export default AdminHeader;