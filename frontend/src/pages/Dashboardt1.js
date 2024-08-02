import React, { useState } from 'react';
import '../App.css';
import Navbar2 from '../components/Navbar2';

const Dashboardt1 = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    deadline: '',
    submissionType: 'file',
    file: null,
    link: '',
    description: ''
  });
  const [filter, setFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [editAssignment, setEditAssignment] = useState(null);

  const handleFileChange = (event) => {
    setNewAssignment({
      ...newAssignment,
      file: event.target.files[0]
    });
    setErrorMessage('');
  };

  const handleLinkChange = (event) => {
    setNewAssignment({
      ...newAssignment,
      link: event.target.value
    });
    setErrorMessage('');
  };

  const handleDescriptionChange = (event) => {
    setNewAssignment({
      ...newAssignment,
      description: event.target.value
    });
    setErrorMessage('');
  };

  const handleNewAssignmentChange = (event) => {
    const { name, value } = event.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleSubmitAssignment = () => {
    if (!newAssignment.title || !newAssignment.deadline || !newAssignment.description) {
      setErrorMessage('Title, deadline, and description are required.');
      return;
    }

    if (editAssignment) {
      // Edit existing assignment
      setAssignments(assignments.map((assignment) =>
        assignment.id === editAssignment.id ? { ...newAssignment, id: editAssignment.id } : assignment
      ));
      setEditAssignment(null);
    } else {
      // Add new assignment
      setAssignments([...assignments, {
        ...newAssignment,
        id: Date.now(),
        isSubmitted: false,
        file: newAssignment.file,
        link: newAssignment.link,
        grade: null
      }]);
    }

    setNewAssignment({ title: '', deadline: '', submissionType: 'file', file: null, link: '', description: '' });
    setErrorMessage('');
  };

  const handleEdit = (assignmentId) => {
    const assignmentToEdit = assignments.find((assignment) => assignment.id === assignmentId);
    setEditAssignment(assignmentToEdit);
    setNewAssignment({
      title: assignmentToEdit.title,
      deadline: assignmentToEdit.deadline,
      submissionType: assignmentToEdit.submissionType,
      file: assignmentToEdit.file,
      link: assignmentToEdit.link,
      description: assignmentToEdit.description
    });
  };

  const handleDelete = (assignmentId) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !assignment.isSubmitted;
    if (filter === 'completed') return assignment.isSubmitted;
    return false;
  });

  return (
    <>
      <Navbar2 />
      <div className="dashboard-container">
        <h2>Manage Assignments for Web and App Development</h2>

        <div className="new-assignment-form">
          <h3>{editAssignment ? 'Edit Assignment' : 'Post New Assignment'}</h3>
          <input
            type="text"
            name="title"
            value={newAssignment.title}
            onChange={handleNewAssignmentChange}
            placeholder="Assignment Title"
          />
          <input
            type="date"
            name="deadline"
            value={newAssignment.deadline}
            onChange={handleNewAssignmentChange}
          />
          <label>
            Submission Type:
            <select
              name="submissionType"
              value={newAssignment.submissionType}
              onChange={handleNewAssignmentChange}
            >
              <option value="file">File</option>
              <option value="link">Link</option>
            </select>
          </label>
          {/* {newAssignment.submissionType === 'file' && (
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx, .xls, .xlsx, .txt" // Adjust file types as needed
            />
          )}
          {newAssignment.submissionType === 'link' && (
            <input
              type="text"
              value={newAssignment.link}
              onChange={handleLinkChange}
              placeholder="Enter assignment link"
            />
          )} */}
          <textarea
            name="description"
            value={newAssignment.description}
            onChange={handleDescriptionChange}
            placeholder="Assignment Description"
          />
          <button onClick={handleSubmitAssignment}>
            {editAssignment ? 'Update Assignment' : 'Post Assignment'}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="filter-dropdown">
          <label>
            Filter Assignments:
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <div className="assignments-section">
          <h3>{filter.charAt(0).toUpperCase() + filter.slice(1)} Assignments</h3>
          <div className="assignments-container">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => (
                <div key={assignment.id} className="assignment-card">
                  <h4>{assignment.title}</h4>
                  <p><strong>Deadline:</strong> {assignment.deadline}</p>
                  <p><strong>Description:</strong> {assignment.description}</p>
                  <p><strong>Submission Type:</strong> {assignment.submissionType}</p>
                  <div className="assignment-actions">
                    <button className='button' onClick={() => handleEdit(assignment.id)}>Edit</button>
                    <button className='button' onClick={() => handleDelete(assignment.id)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No {filter} assignments.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardt1;
