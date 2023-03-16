import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart, faMagnifyingGlass, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import image from "../../images/download.jpg";
import { categoryListAction } from "../../action/Front.action";
import { setAlert } from '../../slices/home';

const HeaderNew = () => {

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
            <Navbar collapseOnSelect expand="lg" >
                <Container>
                    <Navbar.Brand href="/" className="logo">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            {
                                localStorage.getItem('userType') ?
                                    <>
                                        <Nav.Link className="text-white" href="#"><FontAwesomeIcon icon={faMagnifyingGlass} /></Nav.Link>
                                        <Nav.Link className="text-white" href="#"><FontAwesomeIcon icon={faUser} /></Nav.Link>
                                        <Nav.Link className="text-white" href="#"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                                        <Nav.Link className="text-white" href="#"><FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                                        <Nav.Link className="text-white" onClick={e => logout()} title='Logout'><FontAwesomeIcon icon={faPowerOff} /></Nav.Link>
                                    </>

                                    :

                                    <>
                                        <Nav.Link className="text-white" href="/login"><FontAwesomeIcon icon={faUser} /></Nav.Link>
                                    </>
                            }


                        </Nav>
                        {/* <Nav>
                            <div className="collapse navbar-collapse col-8 " id="navbarNav">
                                <ul className="navbar-nav nav-justified w-100">
                                    <li className="nav-item dropdown" >
                                        <Link className="nav-link navFS active text-dark dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Women</Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <span className="dropdown-item" to="#">Kurtas</span>
                                            <ul>
                                                <li><Link className="dropdown-item" to="#">Kurtas</Link></li>
                                                <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                                <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                            </ul>
                                            <ul>
                                                <li><Link className="dropdown-item" to="#">Suits</Link></li>
                                                <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                                <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                            </ul>
                                            <ul>
                                                <li><Link className="dropdown-item" to="#">Sarees</Link></li>
                                                <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                                <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                            </ul>
                                            <ul>
                                                <li><Link className="dropdown-item" to="#">Bottoms</Link></li>
                                                <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                                <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                            </ul>
                                            <ul>
                                                <li><Link className="dropdown-item" to="#">Lehengas</Link></li>
                                                <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                                <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                            </ul>
                                            <ul>
                                                <li><Link className="dropdown-item" to="#">Western</Link></li>
                                                <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                                <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link navFS text-dark" to="#projects">Girls</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link navFS text-white" to="#pricing">Sale</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link navFS text-white" to="#team">Trending</Link>
                                    </li>

                                </ul>
                            </div>


                        </Nav> */}
                    </Navbar.Collapse>

                  
                </Container>
            </Navbar>
            {/* <nav className="navbar navbar-expand  flex-column">
                <div className="col-12 d-flex justify-content-between">
                    <Link className="navbar-brand " to="/"><img src={image} className="logo" /></Link>
                    <ul className="navbar-nav">
                        <div className="header-Icon">
                            {
                                localStorage.getItem('userType') ?
                                    <>
                                        <span className="btn text-white"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                                        <span className="btn text-white"><FontAwesomeIcon icon={faUser} /></span>
                                        <span className="btn text-white"><FontAwesomeIcon icon={faHeart} /></span>
                                        <span className="btn text-white"><FontAwesomeIcon icon={faShoppingCart} /></span>
                                        <span onClick={e => logout()} className="btn text-white" title='Logout'>
                                            <faPowerOff />
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
                <div className="collapse navbar-collapse col-8 " id="navbarNav">
                    <ul className="navbar-nav nav-justified w-100">
                        <li className="nav-item dropdown" >
                            <Link className="nav-link navFS active text-dark dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Women</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <span className="dropdown-item" to="#">Kurtas</span>
                                <ul>
                                    <li><Link className="dropdown-item" to="#">Kurtas</Link></li>
                                    <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                    <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                </ul>
                                <ul>
                                    <li><Link className="dropdown-item" to="#">Suits</Link></li>
                                    <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                    <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                </ul>
                                <ul>
                                    <li><Link className="dropdown-item" to="#">Sarees</Link></li>
                                    <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                    <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                </ul>
                                <ul>
                                    <li><Link className="dropdown-item" to="#">Bottoms</Link></li>
                                    <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                    <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                </ul>
                                <ul>
                                    <li><Link className="dropdown-item" to="#">Lehengas</Link></li>
                                    <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                    <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                </ul>
                                <ul>
                                    <li><Link className="dropdown-item" to="#">Western</Link></li>
                                    <li><Link className="dropdown-item" to="#">Anarkali</Link></li>
                                    <li><Link className="dropdown-item" to="#">Asymmetric</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navFS text-dark" to="#projects">Girls</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navFS text-white" to="#pricing">Sale</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navFS text-white" to="#team">Trending</Link>
                        </li>

                    </ul>
                </div>
            </nav> */}
        </div>
    );
}

export default HeaderNew;