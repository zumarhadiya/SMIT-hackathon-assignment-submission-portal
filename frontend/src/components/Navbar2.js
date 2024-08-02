import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import './navbar.css'; 

const Navbar2 = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>

                {/* Menu Section */}
                <ul className="navbar-menu">
                    <li>
                        <NavLink to="/home2">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt1">Web and App Development</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt2">Graphic Designing</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt3">AI & Chatbot</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/assignment-submissions">Assignment Submissions</NavLink>
                    </li> */}
                    {/* <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li> */}
                </ul>

                {/* User Info Section */}
                <div className="user-info">
                    <h1>{loggedInUser}</h1>
                    <button className="feature-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
