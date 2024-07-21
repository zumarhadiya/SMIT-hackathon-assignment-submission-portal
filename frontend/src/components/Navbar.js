import React, { useState } from "react";
import "./navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'



const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    // const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
          localStorage.removeItem('token');
          localStorage.removeItem('loggedInUser');
          handleSuccess('User Loggedout');
          setTimeout(() => {
              navigate('/login');
          }, 1000)
        }


  return (
    <div className="main">

      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
        <img src={logo}/>
        </div>

        {/* 2nd menu part  */}
      


          
            <div className="user-info">
                
                <h1> {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
           </div>

      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </div>
  );
};

export default Navbar;