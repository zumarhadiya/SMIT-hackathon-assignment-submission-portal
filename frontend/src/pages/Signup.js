import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import logo from '../assets/logo.png'
import './signup.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        userType: ''  // New state for user type
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, userType } = signupInfo;
        if (!name || !email || !password || !userType) {
            return handleError('All fields are required')
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <>
            <img className='smit-logo' src={logo} />
            <div className='container'>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                        />
                    </div>
                    <div>
                        <label htmlFor='userType'>I am</label>
                        <select
                            name='userType'
                            onChange={handleChange}
                            value={signupInfo.userType}
                        >
                            <option value=''>Select user type...</option>
                            <option value='student'>Student</option>
                            <option value='teacher'>Teacher</option>
                        </select>
                    </div>
                    <button type='submit'>Signup</button>
                    <span>Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup;
