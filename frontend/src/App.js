import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import Dashboard from './pages/Dashboard1';
import Dashboard2 from './pages/Dashboard2';
import Dashboard3 from './pages/Dashboard3';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />
  // }
  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
};


  return (
    <div className="App">
      {/* <RefrshHandler setIsAuthenticated={setIsAuthenticated} /> */}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/home2' element={<PrivateRoute element={<Home2 />} />} />
        <Route path='/dashboard1' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/dashboard2' element={<PrivateRoute element={<Dashboard2 />} />} />
        <Route path='/dashboard3' element={<PrivateRoute element={<Dashboard3 />} />} />
      </Routes>
    </div>
  );
}

export default App;
