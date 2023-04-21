import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaPowerOff } from 'react-icons/fa';
import { parentDefault } from '../../common/Constant';

import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart, faMagnifyingGlass, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { categoryListAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';

const HeaderNew1 = () => {

    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({});

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
            console.log(resp.data);
            setList(resp.data)
        }

    }

    useEffect(() => {
        getList();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="Header navBG">
            <header className="section-header">
                <section className="header-main">
                    <div className="container">
                        <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
                            <div className="col-lg-8 col-md-6 col-sm-12">
                                <Link className="navbar-brand logo" to="/">LOGO</Link>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="widgets-wrap float-md-end">
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
                            </div>
                        </div>
                    </div>
                </section>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container">
                        <Link className="navbar-brand d-md-none d-md-flex navFS text-white" href="#">Categories</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse  navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav justify-content-center col-lg-12">
                                <li class="nav-item dropdown">
                                    <Link class="nav-link nav-link_Res navFS" href="#">Women</Link>
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
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link nav-link_Res navFS" to="#">Girls</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" to="#">Sale</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" to="#">Trending</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderNew1;