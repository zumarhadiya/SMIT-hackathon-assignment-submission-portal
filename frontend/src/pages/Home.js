import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Home2.css'; 
import { Link } from 'react-router-dom';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(null); 

    const handleOpenModal = (type) => {
        setIsModalOpen(type);
    };

    const handleCloseModal = () => {
        setIsModalOpen(null);
    };

    return (
        <div>
            <Navbar />
            <section className="hero-section">
                <h1>Welcome to the Student Dashboard</h1>
                <div className="dashboard-features">
                    <div className="feature-card">
                        <h2>View Assignments</h2>
                        <p>Check all the assignments posted by your teachers. Stay on top of your tasks.</p>
                        <button onClick={() => handleOpenModal('view')} className="feature-button">View Assignments</button>
                    </div>
                    <div className="feature-card">
                        <h2>Submit Assignments</h2>
                        <p>Submit your assignments before the deadline. Ensure your work is reviewed on time.</p>
                        <button onClick={() => handleOpenModal('submit')} className="feature-button">Submit Assignments</button>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Select Course</h2>
                        <div className="modal-buttons">
                            <Link to={`/dashboard${isModalOpen === 'view' ? '1' : '1'}`} className="modal-button">Web And App Development</Link>
                            <Link to={`/dashboard${isModalOpen === 'view' ? '2' : '2'}`} className="modal-button">Graphic Designing</Link>
                            <Link to={`/dashboard${isModalOpen === 'view' ? '3' : '3'}`} className="modal-button">AI & Chatbot</Link>
                        </div>
                        <button onClick={handleCloseModal} className="modal-close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
