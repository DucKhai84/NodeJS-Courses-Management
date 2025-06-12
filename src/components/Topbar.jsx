import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/admin.css';
import '../assets/fonts/fontawesome-free-6.5.1-web/css/all.min.css';
import Logo from '../assets/images/LogoTitle.png';
import avatar from '../assets/images/R.jpg';


function Topbar() {
    return (
        <section id='topBar'>
            <div className="container topBar_container">
                <ul className="topBar_lists">
                    <li className="topBar_lists-items">
                        <img src={Logo} alt="Logo" className="topBar_items-img" />
                    </li>
                    <li className="topBar_lists-items">
                        <Link to="/" className="topBar_items-link">Home</Link>
                    </li>
                    <li className="topBar_lists-items">
                        <Link to="/courses" className="topBar_items-link">Courses</Link>
                    </li>
                    <li className="topBar_lists-items">
                        <Link to="/lectures" className="topBar_items-link">Lectures</Link>
                    </li>
                </ul>

                <div className="topBar_login">
                    <span className="topBar_login-notification">
                        <i className="fa-regular fa-bell topBar_notication-icon"></i>
                    </span>
                    <div className="topBar_login-avatar">
                        <img src={avatar} alt="Avatar" className="topBar_avatar-img" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Topbar;
