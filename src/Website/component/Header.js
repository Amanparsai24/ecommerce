import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaPowerOff } from 'react-icons/fa';
import { faHeart, faShoppingCart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { parentDefault } from '../../common/Constant';
import { categoryListAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';

const Header = () => {

    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({ });

    const logout = async () => {

        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    }

    const getList = async (action = '') => {

        let filterData = { ...formData };
        dispatch(setAlert({ open: true, severity: "success", msg: "Loading...", type: 'loader' }));
        const resp = await categoryListAction(filterData);
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            // console.log(resp.data);
            setList(resp.data)
        }

    }

    useEffect(() => {
        getList();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="Header navBG">
            <nav className="navbar navbar-expand  flex-column">
                <div className="col-12 d-flex justify-content-between">
                    <Link className="navbar-brand logo" to="/">LOGO</Link>
                    <ul className="navbar-nav">
                        <div className="header-Icon">
                            {
                                localStorage.getItem('userType') ?
                                    <>
                                        <span className="btn text-white" title="Search">
                                            <Link className='text-decoration-none text-white' to="/login">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </Link>
                                        </span>
                                        <span className="btn text-white" title="Profile">
                                            <Link className='text-decoration-none text-white' to="/profile">
                                                <FontAwesomeIcon icon={faUser} />
                                            </Link>
                                        </span>
                                        <span className="btn text-white" title="Whislist">
                                            <Link className='text-decoration-none text-white' to="/wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </Link>
                                        </span>
                                        <span className="btn text-white" title="Cart">
                                            <Link className='text-decoration-none text-white' to="/cart">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </Link>
                                        </span>
                                        <span onClick={e => logout()} className="btn text-white" title='Logout'>
                                            <FaPowerOff />
                                        </span> 
                                    </>

                                    :

                                    <>
                                        <span className="btn text-white"><Link className="text-decoration-none text-white" to="/login"><FontAwesomeIcon icon={faUser} /></Link></span>
                                    </>
                            }
                        </div>
                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar navbar-collapse col-8 ">
                    <div className="dropdown ">
                        <Link className="dropbtn navFS">Women <i className="fa fa-caret-down"></i></Link>
                        <div className="dropdown-content p-4">
                            <div className="header">
                                <p className='navMH'>All Women</p>
                            </div>
                            <div className="row">
                                {
                                    list && list.length > 0 && list.map((item, index) => {
                                        let parentname = '';
                                        if (item.parent_id !== parentDefault) {

                                            let parentData = list.find(ca => ca._id === item.parent_id);
                                            parentname = (parentData && parentData.name) ? parentData.name : '';

                                        }
                                        return <div className="col-md-2" key={index}>
                                            <p className='navMH text-start'>{item.name}</p>
                                           <Link className="navlinkmul" to="">{parentname}</Link>
                                        </div>
                                    })
                                } 
                            </div>
                        </div>
                    </div>
                    <Link className="nav-link navFS text-dark" to="#">Girls</Link>
                    <Link className="nav-link navFS text-white" to="#">Sale</Link>
                    <Link className="nav-link navFS text-white" to="#">Trending</Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;