import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import validator from 'validator';

const StudentDialog = ({ isOpen, onClose, studentId }) => {
  const [student, setStudent] = useState({
    student_fname: '',
    student_lname: '',
    gender: '',
    email: '',
    usn: '',
    branch: '',
    batch: '',
    semester: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      loadStudent(studentId);
    }
  }, [studentId]);

  const loadStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/student/${studentId}`);
      setStudent(result.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (studentId) {
        await axios.put(`http://localhost:8080/student/${studentId}`, student);
        alert('Student updated successfully!');
      } else {
        // Basic validation
        if (!student.student_fname || !student.student_lname || !student.gender || !student.email || !student.usn || !student.branch || !student.batch || !student.semester) {
          alert('Please fill in all fields');
          return;
        }
        // Additional validation for email format
        if (!validator.isEmail(student.email)) {
          alert('Please enter a valid email address');
          return;
        }
        // Validation for batch format (YYYY)
        if (!/^\d{4}$/.test(student.batch)) {
          alert('Batch should be in YYYY format');
          return;
        }
        // Validation for semester (numeric)
        if (!/^[1-8]$/.test(student.semester)) {
          alert('Semester should contain a numeric value between 1 and 8');
          return;
        }
        
        await axios.post('http://localhost:8080/student', student);
        alert('Student added successfully!');
      }
      onClose();
      navigate("/students"); // Navigate back to students page
      window.location.reload(); // Force reload after navigation
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { student_fname, student_lname, gender, email, usn, branch, batch, semester } = student;

  return (
    <div className={`container mt-4 mb-3 border border-warning rounded shadow popupbox ${isOpen ? 'open' : ''}`} style={{ position: 'fixed', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999', backgroundColor: 'rgb(196, 216, 239)' }}>
      <button type="button" className="btn btn-sm mt-2 btn-outline-danger float-end rounded-pill cancel_button" onClick={onClose}>
        <AiOutlineClose className="mr-0 pb-1" /> Close
      </button>
      <div className="dialog-content">
        <h2 className="text-center reg_btn mt-3 mb-4">{studentId ? 'Edit Student' : 'Register Student'}</h2>
        <div className='container mb-4'>
          <form onSubmit={onSubmit}>
            <div className="row mb-3 ">
              <div className="col-md-6">
                <label htmlFor="FirstName" className="form-label form-label-left">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter student first name here"
                  name="student_fname"
                  value={student_fname}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="LastName" className="form-label ">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last student name here"
                  name="student_lname"
                  value={student_lname}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="row mb-2 ">
              <div className="col-md-3">
                <fieldset className="form-group">
                  <div className="row">
                    <legend className="col-form-label col-sm-3 pt-2">Gender </legend>
                    <div className="col-sm-2">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="gridRadios1" value="Male" checked={gender === "Male"} onChange={onInputChange} />
                        <label className="form-check-label" htmlFor="gridRadios1">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="gridRadios2" value="Female" checked={gender === "Female"} onChange={onInputChange} />
                        <label className="form-check-label" htmlFor="gridRadios2">
                          Female
                        </label>
                      </div>
                      <div className="form-check disabled">
                        <input className="form-check-input" type="radio" name="gender" id="gridRadios3" value="Other" checked={gender === "Other"} onChange={onInputChange} />
                        <label className="form-check-label" htmlFor="gridRadios3">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="col-md-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email here"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="usn" className="form-label">
                  USN
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter student USN here"
                  name="usn"
                  value={usn}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="batch" className="form-label">
                  Batch
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter batch(YYYY) here"
                  name="batch"
                  value={batch}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="row mb-3 ">
              <div className="col-md-6">
                <label htmlFor="branch" className="form-label">
                  Branch
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter branch here"
                  name="branch"
                  value={branch}
                  onChange={onInputChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="semester" className="form-label">
                  Semester
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter semester here"
                  name="semester"
                  value={semester}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-sm mt-3 btn-outline-secondary btn_addStudent">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentDialog;
