import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Header from './Website/component/Header'; 
import Footer from './Website/component/Footer';
import AdminLogin from './Website/pages/AdminLogin';
import Home from './Website/pages/Home';
import Login from './Website/pages/Login';
import OtpVerify from './Website/pages/OtpVerify';
import Product from './Website/pages/Product';
import ProductDetails from './Website/pages/ProductDetails';
import Cart from './Website/pages/Cart';
import PageNotFound from './Website/pages/PageNotFound';
import ContactUs from "./Website/pages/ContactUs";
import CallUs from "./Website/pages/CallUs";

function OpenRoutes() {

    return (
        <Row>
            <Header />
            <Col>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/otp" element={<OtpVerify />} />
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/productdetails" element={<ProductDetails />} />
                    <Route exact path="/cart" element={<Cart />} />
                    {/* <Route exact path="/orderplaced" element={<OrderPlaced />} /> */}
                    <Route exact path="/contactus" element={<ContactUs />} />
                    <Route exact path="/callus" element={<CallUs />} />

                    {/* for admin login */}
                    <Route exact path="/admin" element={<AdminLogin />} />
                    {/* Using * renders the NotFound component for all the URLs not specified in routes. */}
                    <Route exact path="*" element={<PageNotFound />} />
                </Routes>
            </Col>
            <Footer />
        </Row>

    );

}

export default OpenRoutes;

