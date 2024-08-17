import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import logo from '../assets/logo.png';
import './signup.css';

const studentCode = 'student1234'; 
const teacherCode = 'missFaiza1122'; 
function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        userType: '',
        code: ''  
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, userType, code } = signupInfo;
        
        if (!name || !email || !password || !userType) {
            return handleError('All fields are required');
        }
        
        if (userType === 'teacher' && code !== teacherCode) {  
            return handleError('Invalid teacher code');
        }

        if (userType === 'student' && code !== studentCode) {
            return handleError('Invalid student code');
        }

        try {
            const url = `https://assignment-lemon-zeta.vercel.app/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, userType }) 
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
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
            <img className='smit-logo' src={logo} alt="Logo" />
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
                    {(signupInfo.userType === 'teacher' || signupInfo.userType === 'student') && (
                        <div>
                            <label htmlFor='code'>
                                {signupInfo.userType === 'teacher' ? 'Teacher Code' : 'Student Code'}
                            </label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='code'
                                placeholder={`Enter ${signupInfo.userType === 'teacher' ? 'teacher' : 'student'} code...`}
                                value={signupInfo.code}
                            />
                        </div>
                    )}
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
