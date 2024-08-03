import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/Navbar2';
import './ViewSubmissions.css';

function ViewSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const [grade, setGrade] = useState('');
    const [comments, setComments] = useState('');
    const [filter, setFilter] = useState('all');
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    useEffect(() => {
        const dummySubmissions = [
            {
                id: 1,
                studentName: 'zumar',
                dateSubmitted: '2024-08-01',
                status: 'Not Graded',
                grade: '',
                fileUrl: '/uploads/assignment1.pdf',
                linkUrl: 'https://example.com/assignment1',
                comments: ''
            },
            {
                id: 2,
                studentName: 'hadiya',
                dateSubmitted: '2024-08-02',
                status: 'Not Graded',
                grade: '',
                fileUrl: '/uploads/assignment2.pdf',
                linkUrl: 'https://example.com/assignment2',
                comments: ''
            },
            {
                id: 3,
                studentName: 'bla bla',
                dateSubmitted: '2024-08-03',
                status: 'Not Graded',
                grade: '',
                fileUrl: '/uploads/assignment3.pdf',
                linkUrl: 'https://example.com/assignment3',
                comments: ''
            }
        ];

        setSubmissions(dummySubmissions);
        setLoading(false);
    }, []);

    const handleOpenModal = (submission) => {
        setCurrentSubmission(submission);
        setIsModalOpen(true);
        setErrorMessage(''); // Reset error message when opening modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setGrade('');
        setComments('');
        setErrorMessage(''); // Reset error message when closing modal
    };

    const handleGradeSubmission = () => {
        if (grade === '' || comments === '') {
            setErrorMessage('Please select a grade and provide comments.');
            return;
        }

        setSubmissions((prevSubmissions) =>
            prevSubmissions.map((sub) =>
                sub.id === currentSubmission.id
                    ? { ...sub, grade, comments, status: 'Graded' }
                    : sub
            )
        );
        handleCloseModal();
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredSubmissions = submissions.filter((submission) => {
        if (filter === 'graded') return submission.status === 'Graded';
        if (filter === 'not-graded') return submission.status === 'Not Graded';
        return true; // 'all' case
    });

    if (loading) {
        return <div>Loading submissions...</div>;
    }

    return (
        <div>
            <Navbar2 />
            <section className="submissions-section">
                <h1>Student Submissions</h1>

                <div className="filter-section">
                    <label>
                        Filter:
                        <select value={filter} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="graded">Graded</option>
                            <option value="not-graded">Not Graded</option>
                        </select>
                    </label>
                </div>

                <div className="submissions-list">
                    {filteredSubmissions.length === 0 ? (
                        <p>No submissions found.</p>
                    ) : (
                        filteredSubmissions.map((submission) => (
                            <div key={submission.id} className="submission-card">
                                <h3>{submission.studentName}</h3>
                                <p>Submitted on: {new Date(submission.dateSubmitted).toLocaleDateString()}</p>
                                <p>Status: {submission.status}</p>
                                {submission.status === 'Graded' && (
                                    <>
                                        <p>Grade: {submission.grade}</p>
                                        <p>Comments: {submission.comments}</p>
                                    </>
                                )}
                                <div className="submission-actions">
                                    <a href={submission.fileUrl} download className="action-button">Download</a>
                                    <a href={submission.linkUrl} target="_blank" rel="noopener noreferrer" className="action-button">View Link</a>
                                    <button onClick={() => handleOpenModal(submission)} className="action-button">Grade</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Grade Submission for {currentSubmission?.studentName}</h2>
                        <div className="modal-body">
                            {errorMessage && (
                                <div className="error-message">{errorMessage}</div>
                            )}
                            <label>
                                Grade:
                                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                                    <option value="">Select Grade</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="F">F</option>
                                </select>
                            </label>
                            <label>
                                Comments:
                                <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleGradeSubmission} className="modal-button">Submit Grade</button>
                            <button onClick={handleCloseModal} className="modal-button modal-close-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewSubmissions;
