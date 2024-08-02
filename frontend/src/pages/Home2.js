import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Home2.css';
import { Link } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';


function Home2() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar2 />
            <section className="hero-section">
                <h1>Welcome to the Assignment Submission Portal</h1>
                <div className="dashboard-features">
                    <div className="feature-card">
                        <h2>Post New Assignment</h2>
                        <p>Create and assign new tasks to students. Define deadlines and instructions easily.</p>
                        <button onClick={handleOpenModal} className="feature-button">Create Assignment</button>
                    </div>
                    <div className="feature-card">
                        <h2>View Submissions</h2>
                        <p>Monitor and review assignments submitted by students. Check their progress and grades.</p>
                        <Link to="/view-submissions" className="feature-button">View Submissions</Link>
                    </div>
                    <div className="feature-card">
                        <h2>Grade Assignments</h2>
                        <p>Grade student assignments and provide feedback directly from the portal.</p>
                        <Link to="/grade-assignments" className="feature-button">Grade Assignments</Link>
                    </div>
                </div>
            </section>

            {/* Modal for course selection */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Select Course to Post Assignment</h2>
                        <div className="modal-buttons">
                            <Link to="/dashboardt1" className="modal-button">Web And App Development</Link>
                            <Link to="/dashboardt2" className="modal-button">Graphic Designing</Link>
                            <Link to="/dashboardt3" className="modal-button">Ai & Chatbot</Link>
                        </div>
                        <button onClick={handleCloseModal} className="modal-close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home2;
