import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Header from './component/AdminHeader';
import Footer from './component/AdminFooter';
import Dashboard from './pages/Dashboard';

function AdminRoutes() {

    return (
        <Row>
            <Header />
            <Col>
                <Routes>
                    <Route exact path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Col>
            <Footer />
        </Row>

    );

}

export default AdminRoutes;

