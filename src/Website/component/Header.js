import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FaPowerOff } from 'react-icons/fa';
import { parentDefault } from '../../common/Constant';
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart, faMagnifyingGlass, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { categoryListAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';
import kids from "../../images/kids.jpg";
import women from "../../images/women.webp";

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
                                            let parentname="";

                                            if (item.parentId !== parentDefault){
                                                parentname = item.name;
                                            }
                                            console.log(parentname);
                                                return <Fragment key={index}>
                                                    <li className="nav-item dropdown">
                                                        {
                                                            item.parentId === parentDefault && 
                                                            <Link className="nav-link nav-link_Res navFS" href="#">{item.name}</Link>
                                                        } 
                                                        <div className="dropdown-content p-4">
                                                            <div className="row">
                                                                <div className="col-md-2" >
                                                                    {
                                                                        item.name == "Women" ?

                                                                            <img src={women} className="img-fluid" alt="..." />

                                                                            :

                                                                            <img src={kids} className="img-fluid" alt="..." />
                                                                    }
                                                                   
                                                                </div>
                                                                <div className="col-md-10" >
                                                                    <div className="header">
                                                                        {
                                                                            item.name == "Women" ?

                                                                                <p className='navMH'>All Women</p>

                                                                                :

                                                                                <p className='navMH'>All Kids</p>
                                                                        }
                                                                    </div>
                                                                   <Row>
                                                                        <div className="col-md-2" key={index}>
                                                                            <Link className="navlinkmul" to="">{parentname}</Link>
                                                                        </div>
                                                                        {/* {
                                                                            list && list.length > 0 && list.map((item, index) =>
                                                                            {
                                                           
                                                                                return <div className="col-md-2" key={index}>
                                                                                    <Link className="navlinkmul" to="">{item.name}</Link>
                                                                                </div>
                                                                            })
                                                                        } */}
                                                                   </Row>
                                                                </div>
                                                       
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Fragment>
                                          
                                        })
                                    }
                                    
                                <li className="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" to="#">Sale</Link>
                                </li>
                                <li className="nav-item">
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