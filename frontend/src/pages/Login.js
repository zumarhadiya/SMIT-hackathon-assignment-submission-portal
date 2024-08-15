import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import logo from '../assets/logo.png';

const studentCode = 'student1234'; 
const teacherCode = 'missFaiza1122'; 

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        code: '',  
    });
    const [userType, setUserType] = useState(''); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password, code } = loginInfo;

        if (!email || !password || !userType) {
            return handleError('Email, password, and user type are required');
        }

        if (userType === 'teacher' && code !== teacherCode) {  
            return handleError('Invalid teacher code');
        }

        if (userType === 'student' && code !== studentCode) {
            return handleError('Invalid student code');
        }

        try {
            const url = `https://smit-hackathon-assignment-submission-portal-rwpx.vercel.app//auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) 
            });

            const result = await response.json();
            console.log('Login response:', result);  

            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userType', userType);  
                setTimeout(() => {
                    if (userType === 'student') {
                        navigate('/home');
                    } else if (userType === 'teacher') {
                        navigate('/home2');
                    }
                }, 1000);
            } else if (error) {
                console.error('Login error:', error);  
                const details = error?.details[0]?.message;
                handleError(details || message);
            } else {
                handleError(message);
            }
        } catch (err) {
            console.error('Fetch error:', err);  
            handleError('Something went wrong. Please try again later.');
        }
    }

    return (
        <>
            <img className='smit-logo' src={logo} alt="Logo" />
            <div className='container'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                        />
                    </div>
                    <div>
                        <label htmlFor='userType'>I am</label>
                        <select
                            name='userType'
                            onChange={handleUserTypeChange}
                            value={userType}
                        >
                            <option value=''>Select user type...</option>
                            <option value='student'>Student</option>
                            <option value='teacher'>Teacher</option>
                        </select>
                    </div>
                    {(userType === 'teacher' || userType === 'student') && (
                        <div>
                            <label htmlFor='code'>
                                {userType === 'teacher' ? 'Teacher Code' : 'Student Code'}
                            </label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='code'
                                placeholder={`Enter ${userType === 'teacher' ? 'teacher' : 'student'} code...`}
                                value={loginInfo.code}
                            />
                        </div>
                    )}
                    <button type='submit'>Login</button>
                    <span>Don't have an account? 
                        <Link to="/signup">Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}

export default Login;
