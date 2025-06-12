import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Slidebar from '../components/Slidebar';
import '../assets/css/admin.css';
import '../assets/lib/bootstrap/dist/css/bootstrap.min.css';
import '../assets/fonts/fontawesome-free-6.5.1-web/css/all.min.css';



function UserLayout() {
    return (
        <div className="app-layout">
            <Topbar />
            <Slidebar />
            <div id="content_wrapper">
                <main className="content_main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default UserLayout;
