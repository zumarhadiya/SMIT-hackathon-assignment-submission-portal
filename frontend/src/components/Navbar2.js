import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import './navbar.css'; 

const Navbar2 = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>

                {/* Menu Section */}
                <ul className={`navbar-menu ${sidebarOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/home2" onClick={toggleSidebar}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt1" onClick={toggleSidebar}>Web and App Development</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt2" onClick={toggleSidebar}>Graphic Designing</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt3" onClick={toggleSidebar}>AI & Chatbot</NavLink>
                    </li>
                </ul>

                {/* User Info Section */}
                <div className="user-info">
                    <h1>{loggedInUser}</h1>
                    <button className="feature-button" onClick={handleLogout}>Logout</button>
                    <button className="navbar-toggle" onClick={toggleSidebar}>
                        ☰
                    </button>
                </div>
            </div>

            {/* Sidebar for mobile view */}
            <div className={`overlay-menu ${sidebarOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <NavLink to="/home2" onClick={toggleSidebar}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt1" onClick={toggleSidebar}>Web and App Development</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt2" onClick={toggleSidebar}>Graphic Designing</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardt3" onClick={toggleSidebar}>AI & Chatbot</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar2;
