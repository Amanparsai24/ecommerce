import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FaPowerOff } from 'react-icons/fa';
// import { parentDefault } from '../../common/Constant';
import { Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart, faMagnifyingGlass, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { categoryNewListAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import kids from "../../images/kids.jpg";
import women from "../../images/women.webp";
import Logo from "../../images/Logo.png";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
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
        const resp = await categoryNewListAction(filterData);
        dispatch(setAlert({ open: false, severity: "success", msg: "Loading...", type: 'loader' }));
        if (resp.code === 200) {
            setList(resp.categoryData)
        }

    }

    const handleClick = (id) => {
        setTimeout(() => {
            navigate('/product', { state: id })
        }, 10);
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
                                <Link className="" to="/">
                                    <img src={Logo} className="img-fluid logoImg logo" alt="..." />
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="widgets-wrap float-md-end">
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
                                                <span className="btn text-white" title="Cart">
                                                    <Link className='text-decoration-none text-white' to="/cart">
                                                        <FontAwesomeIcon icon={faShoppingCart} />
                                                    </Link>
                                                </span>
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
                            <ul className="navbar-nav justify-content-center col-lg-12">
                                {
                                    list && list.length > 0 && list.map((item, index) => {
                                        return <Fragment key={index}>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link nav-link_Res navFS" onClick={e => handleClick(item.category._id)}>{item.category.name}</Link>
                                                <div className="dropdown-content p-4">
                                                    <div className="row">
                                                        <div className="col-md-2" >
                                                            {
                                                                item.category.name == "Women" ?

                                                                    <img src={women} className="img-fluid" alt="..." />

                                                                    :

                                                                    <img src={kids} className="img-fluid" alt="..." />
                                                            }

                                                        </div>
                                                        <div className="col-md-10" >
                                                            <div className="header">
                                                                {
                                                                    item.category.name == "Women" ?

                                                                        <p className='navMH'>All Women</p>

                                                                        :

                                                                        <p className='navMH'>All Kids</p>
                                                                }
                                                            </div>
                                                            <Row>
                                                                {
                                                                    item.subCategory && item.subCategory.length > 0 && item.subCategory.map((item, index) => {
                                                                        // console.log(item)
                                                                        return <div className="col-md-2" key={index}>
                                                                            <Link className="navlinkmul" onClick={e => handleClick(item._id)}>{item.name}</Link>
                                                                        </div>
                                                                    })
                                                                }
                                                            </Row>
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                        </Fragment>

                                    })
                                }
                                <li className="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" onClick={e => handleClick(1)}>Sale</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" onClick={e => handleClick(2)}>Trending</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;