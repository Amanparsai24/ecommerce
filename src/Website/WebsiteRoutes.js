import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import Header from './component/Header';
import Footer from './component/Footer';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import OtpVerify from './pages/OtpVerify';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import OrderPlaced from './pages/OrderPlaced';
import ContactUs from './pages/ContactUs';

import PageNotFound from './pages/PageNotFound';
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import CallUs from "./pages/CallUs";
import MyAddress from "./pages/MyAddress";
import MyOrders from "./pages/MyOrders";
import OrdersDetails from "./pages/OrdersDetails";

const WebsiteRoutes = () => {

    return (
        <Row>
            {localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'user' &&
                <Header />
            }  
            <Col>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/otp" element={<OtpVerify />} />
                    <Route exact path="/profile" element={<ProfilePage />} />
                    <Route exact path="/myaddress" element={<MyAddress />} />
                    <Route exact path="/myorders" element={<MyOrders />} />
                    <Route exact path="/orderdetails" element={<OrdersDetails />} />
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/productdetails" element={<ProductDetails />} />
                    <Route exact path="/wishlist" element={<WishList />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/address" element={<AddressPage />} />
                    <Route exact path="/payment" element={<PaymentPage />} />
                    <Route exact path="/orderplaced" element={<OrderPlaced />} />
                    <Route exact path="/contactus" element={<ContactUs />} />
                    <Route exact path="/callus" element={<CallUs />} />

                    {/* for admin login */}
                    <Route exact path="/admin" element={<AdminLogin />} />
                    {/* Using * renders the NotFound component for all the URLs not specified in routes. */}
                    <Route exact path="*" element={<PageNotFound />} />
                </Routes>
            </Col>
            {localStorage.getItem('loginType') && localStorage.getItem('loginType') === 'user' &&
                <Footer />
            } 
        </Row>

    );

}

export default WebsiteRoutes;

