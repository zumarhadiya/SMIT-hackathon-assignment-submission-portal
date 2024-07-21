// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
// import ClickableContainer from '../components/Clickablecontainer';
import Navbar from '../components/Navbar';

import { Link } from 'react-router-dom';


function Home() {
    

    // const history = seHistory();

    const handleClick = () => {
        // history.push('/dashboard');

        
      };


    return (
        <div>
            <Navbar />
            {/* <ClickableContainer/> */}
            <section className="hero-section">
                
            <Link to="/dashboard1">
            <div className='container' >
                    <h2>Web And App Development</h2>
                </div>
                </Link>

                <Link to="/dashboard2">
                <div className='container'>
                    <h2>Graphic Designing</h2>
                </div>
                </Link>
                <Link to="/dashboard3">
                <div className='container'>
                    <h2>Ai & chatbot</h2>
                </div>
                </Link>
            </section>

            {/* <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button> */}
            {/* <ToastContainer /> */}
        </div>
    )
}

export default Home
{/* {
    products && products?.map((item, index) => (
        <ul key={index}>
            <span>{item.name} : {item.price}</span>
        </ul>
    ))
} */}
