import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function AdminHeader() {

    const logout = async () => {

        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg navBG">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" href="#">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        {
                            localStorage.getItem('loginType') ?
                                <>
                                    <ul className="navbar-nav me-auto mb-2">
                                        <span onClick={e => logout()} className="text-white" title='Logout'>
                                            <FontAwesomeIcon icon={faPowerOff} />
                                        </span>
                                    </ul>
                                </>
                                :
                                ""
                        }

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default AdminHeader;