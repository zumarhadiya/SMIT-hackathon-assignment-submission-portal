import React, { useState } from 'react';
 // Import your CSS file for styling
import '../App.css';
import Navbar from '../components/Navbar';

const Dashboard1 = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file upload
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle assignment submission
  const handleSubmit = () => {
    // Simulating assignment submission to backend (not implemented in this example)
    if (selectedFile) {
      const newAssignment = {
        id: assignments.length + 1,
        fileName: selectedFile.name,
        grade: null, // Initially null, teacher can later assign a grade
        deadline: '2024-12-31', // Example deadline
      };
      setAssignments([...assignments, newAssignment]);
      setSelectedFile(null); // Clear selected file after submission
    }
  };

  // Function to handle grading assignment
  const handleGradeAssignment = (id, grade) => {
    // Update assignment grade (not implemented in this example)
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, grade: grade } : assignment
    );
    setAssignments(updatedAssignments);
  };

  return (
    <>
    <div className="dashboard-container">

      <h2>Web and App Development</h2>

      {/* File upload form */}
      <div className="upload-section">
        <h3>Submit Assignment</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Assignment list */}
      <div className="assignments-section">
        <h3>Assignments</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Marks Obtained</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.id}</td>
                <td>{assignment.fileName}</td>
                <td>{assignment.grade !== null ? assignment.grade : 'Not graded'}</td>
                <td>{assignment.deadline}</td>
                <td>
                  {assignment.grade === null && (
                    <>
                      <button className="grade-button" onClick={() => handleGradeAssignment(assignment.id, 'A')}>
                        Grade A
                      </button>
                      {/* Add more grading buttons as needed */}
                    </>
                  )}
                  <button className="download-button">Download</button> {/* Add download functionality */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Dashboard1;