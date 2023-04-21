import { Link } from "react-router-dom";

function AdminSiderBar() {


    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/user">
                        <i className="bi bi-person"></i>
                        <span>Users</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default AdminSiderBar;