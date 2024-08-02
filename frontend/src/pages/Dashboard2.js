import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';

const Dashboard2 = () => {
  const initialAssignments = [
    { id: 1, title: 'Assignment 1: Logo Design', deadline: '2024-08-10', isSubmitted: false, fileName: null, file: null, link: null, grade: null },
    { id: 2, title: 'Assignment 2: Poster Design', deadline: '2024-08-15', isSubmitted: false, fileName: null, file: null, link: null, grade: null },
    { id: 3, title: 'Assignment 3: Website Mockup', deadline: '2024-08-20', isSubmitted: false, fileName: null, file: null, link: null, grade: null },
    { id: 4, title: 'Assignment 4: Social Media Graphics', deadline: '2024-08-25', isSubmitted: false, fileName: null, file: null, link: null, grade: null },
    { id: 5, title: 'Assignment 5: Infographic Design', deadline: '2024-08-30', isSubmitted: false, fileName: null, file: null, link: null, grade: null },
  ];

  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionType, setSubmissionType] = useState('file');
  const [submittedLink, setSubmittedLink] = useState('');
  const [filter, setFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage('');
  };

  const handleLinkChange = (event) => {
    setSubmittedLink(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (assignmentId) => {
    // Validation: Check if a file or link is provided
    if (submissionType === 'file' && !selectedFile) {
      setErrorMessage('A file is required for submission.');
      return;
    }
    if (submissionType === 'link' && !submittedLink) {
      setErrorMessage('A link is required for submission.');
      return;
    }

    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          isSubmitted: true,
          fileName: submissionType === 'file' ? selectedFile?.name : null,
          file: submissionType === 'file' ? selectedFile : null,
          link: submissionType === 'link' ? submittedLink : null,
          grade: assignment.grade !== null ? assignment.grade : 'Not Graded',
        };
      }
      return assignment;
    });

    setAssignments(updatedAssignments);
    setSelectedFile(null);
    setSubmittedLink('');
    setErrorMessage('');
  };

  const handleDownload = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !assignment.isSubmitted;
    if (filter === 'completed') return assignment.isSubmitted;
    return false;
  });

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>Graphic Design Assignments</h2>

        <div className="filter-dropdown">
          <label>
            Filter Assignments:
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <div className="assignments-section">
          <h3>{filter.charAt(0).toUpperCase() + filter.slice(1)} Assignments</h3>
          {filteredAssignments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Deadline</th>
                  <th>{filter === 'completed' ? 'Grade' : 'Submit'}</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.id}</td>
                    <td>{assignment.title}</td>
                    <td>{assignment.deadline}</td>
                    <td>
                      {filter === 'completed' ? (
                        <span>{assignment.grade ? assignment.grade : 'Not Graded'}</span>
                      ) : (
                        !assignment.isSubmitted ? (
                          <div className="submit-section">
                            <label>
                              Submit as:
                              <select value={submissionType} onChange={(e) => setSubmissionType(e.target.value)}>
                                <option value="file">File</option>
                                <option value="link">Link</option>
                              </select>
                            </label>

                            {submissionType === 'file' && (
                              <input type="file" onChange={handleFileChange} />
                            )}
                            {submissionType === 'link' && (
                              <input
                                type="text"
                                value={submittedLink}
                                onChange={handleLinkChange}
                                placeholder="Enter assignment link"
                              />
                            )}
                            <button
                              onClick={() => handleSubmit(assignment.id)}
                              disabled={submissionType === 'file' ? !selectedFile : !submittedLink}
                            >
                              Submit
                            </button>
                          </div>
                        ) : (
                          <span>Submitted</span>
                        )
                      )}
                    </td>
                    <td>
                      {assignment.isSubmitted && assignment.file ? (
                        <button onClick={() => handleDownload(assignment.file)}>Download</button>
                      ) : assignment.isSubmitted && assignment.link ? (
                        <a href={assignment.link} target="_blank" rel="noopener noreferrer">View Link</a>
                      ) : (
                        <span>Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No {filter} assignments.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
