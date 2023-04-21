import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from './component/AdminHeader';
import SideBar from './component/AdminSideBar';
import Dashboard from './pages/Dashboard';
import User from './pages/users/User';

function AdminRoutes() {

    return (
        <>
            <div className="bodyclass">
                <Header />
                <SideBar />
                <main id="main" className="main">
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route exact path="/user" element={<User />} />
                    </Routes>
                </main>
            </div>
        </>
    );

}

export default AdminRoutes;

