import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import AddEditStudentDialog from './addredit'; // Import the combined component
import { FaEye, FaEdit, FaTrash, FaUserPlus, FaCheck } from 'react-icons/fa';
import '../Enroll/Enrolls.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [showAddEditDialog, setShowAddEditDialog] = useState(false); // State for managing Add/Edit dialog visibility
  const [editStudentId, setEditStudentId] = useState(null); // State for storing the studentId for editing
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState(''); //Initialize state search bar 
  //pagination Initialization
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(() => {
    const storedStudentsPerPage = localStorage.getItem('studentsPerPage');
    return storedStudentsPerPage ? parseInt(storedStudentsPerPage, 10) : 5;
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get('http://localhost:8080/student');
    setStudents(result.data);
  };

  const deleteStudent = async (id) => {
    // Ask for confirmation
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    
    // If user confirmed, proceed with deletion
    if (confirmed) {
        await axios.delete(`http://localhost:8080/student/${id}`);
        alert('Ok! Delete complete');
        loadStudents();
    } else {
        alert('Deletion canceled');
    }
  };

  const toggleAddEditDialog = (id = null) => {
    setShowAddEditDialog(!showAddEditDialog);
    setEditStudentId(id); // Set the studentId for editing
  };

  // Filter students based on search term
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = (currentPage - 1) * studentsPerPage;// this line to calculate the next serial number for page
  const currentStudents = students
    .filter(student => student.student_fname.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
    .slice(indexOfFirstStudent, indexOfLastStudent);

  //Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const handlePerPageChange = (event) => {
    const selectedStudentsPerPage = Number(event.target.value);
    setStudentsPerPage(selectedStudentsPerPage);
    setCurrentPage(1);
    localStorage.setItem('studentsPerPage', selectedStudentsPerPage);
  };

  return (
    <div>
      <h3 className="enrolls-heading">Student Records Administration</h3>
      {loading ? (
        <ClipLoader color={'#1f5c9d'} loading={loading} size={100} />
      ) : (
        <div className='border rounded p-4 m-2 shadow'>
          <div className="search-bar mb-2 p-1">
            <input className='search'
              type="text"
              placeholder= "Search by First Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='btn btn-outline-secondary btn-sm mx-1 btn_addStudent' onClick={() => toggleAddEditDialog()}>
            <FaUserPlus className="mb-1" /> Add Student
            </button>
          </div>
          <div>
            <table className="table border shadow table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">SI.NO</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">USN</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Batch(YYYY)</th>
                  <th scope="col">Semester</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {currentStudents.map((student, index) => (
                  <tr key={index}>
                    <th scope="row">{index + indexOfFirstStudent + 1}</th>
                    <td>{student.student_fname}</td>
                    <td>{student.student_lname}</td>
                    <td>{student.gender}</td>
                    <td>{student.email}</td>
                    <td>{student.usn}</td>
                    <td>{student.branch}</td>
                    <td>{student.batch}</td>
                    <td>{student.semester}</td>
                    <td>
                      <Link className='btn btn-outline-primary btn-sm mx-1 btn_view' to={`/viewstudents/${student.id}`}>
                      <FaCheck className="mr-1 mb-1" size={13}  /> Enroll
                      </Link>
                      <button className='btn btn-outline-success btn-sm mx-1 btn_enroll' onClick={() => toggleAddEditDialog(student.id)}>
                        <FaEdit className="mr-1 mb-1"  size={13}/> Edit
                      </button>
                      <button className='btn btn-outline-danger btn-sm mx-1 btn_delete' onClick={() => deleteStudent(student.id)}>
                        <FaTrash className="mr-1 mb-1" size={13} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <div className="enrolls-options ">
                <label htmlFor="studentsPerPage">Show:</label>
                <select className='dropdwn rounded' id="studentsPerPage" value={studentsPerPage} onChange={handlePerPageChange}>
                  {Array.from({ length: 20 }, (_, index) => (
                    <option className='opt_txt' key={index + 1} value={index + 1}>
                      {index + 1} Students
                    </option>
                  ))}
                </select>
              </div>
              <div className='page_btn'>
                <button className="pagination-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  {'<'}
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`pagination-btn ${currentPage === i + 1 ? 'actives' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="pagination-btn" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                  {'>'}
                </button>
              </div>
            </div>
            
            </div>
        </div>
      )}
      {showAddEditDialog && <AddEditStudentDialog isOpen={showAddEditDialog} onClose={toggleAddEditDialog} studentId={editStudentId} />}
    </div>
  );
}
