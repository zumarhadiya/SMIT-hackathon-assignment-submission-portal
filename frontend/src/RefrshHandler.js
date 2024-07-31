import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RefrshHandler = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');

        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/login' || location.pathname === '/signup') {
                if (userType === 'student') {
                    navigate('/home');
                } else if (userType === 'teacher') {
                    navigate('/home2');
                }
            }
        } else {
            setIsAuthenticated(false);
            // Allow access to login and signup pages without redirection
            if (location.pathname !== '/login' && location.pathname !== '/signup') {
                navigate('/login');
            }
        }
    }, [setIsAuthenticated, navigate, location.pathname]);

    return null;
};

export default RefrshHandler;
