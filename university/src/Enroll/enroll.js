import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaEye } from 'react-icons/fa';
import './Enrolls.css'; // Import custom CSS for styling

export default function Enrolls() {
  const [enrolledsub, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(() => {
    const storedStudentsPerPage = localStorage.getItem('studentsPerPage');
    return storedStudentsPerPage ? parseInt(storedStudentsPerPage, 10) : 5;
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadStudents().then(() => setLoading(false));
    }, 500);
  }, []);

  const loadStudents = async () => {
    const result = await axios.get('http://localhost:8080/enrolled');
    setEnrolled(result.data);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = enrolledsub
    .filter(enrolled => enrolled.student_fname.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
    .slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(enrolledsub.length / studentsPerPage);

  const handlePerPageChange = (event) => {
    const selectedStudentsPerPage = Number(event.target.value);
    setStudentsPerPage(selectedStudentsPerPage);
    setCurrentPage(1);
    localStorage.setItem('studentsPerPage', selectedStudentsPerPage);
  };

  return (
    <div className="enrolls-container">
      <h2 className="enrolls-heading">Enrolled Student Details</h2>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color={'#1f5c9d'} loading={loading} size={100} />
        </div>
      ) : (
        <div className='border rounded p-4 mt-2 shadow'>
          <div className="search-bar mb-2 p-1 ">
            <input className='search'
              type="text"
              placeholder="Search by First Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <table className="enrolls-table">
              <thead>
                <tr>
                  <th>SI.NO</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>USN</th>
                  <th>Branch</th>
                  <th>Batch(YYYY)</th>
                  <th>Semester</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {currentStudents.map((enrolled, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstStudent + index + 1}</td>
                    <td>{enrolled.student_fname}</td>
                    <td>{enrolled.student_lname}</td>
                    <td>{enrolled.gender}</td>
                    <td>{enrolled.email}</td>
                    <td>{enrolled.usn}</td>
                    <td>{enrolled.branch}</td>
                    <td>{enrolled.batch}</td>
                    <td>{enrolled.semester}</td>
                    <td>{enrolled.subject_code}</td>
                    <td>{enrolled.subject_name}</td>
                    <td>
                      <Link className='btn btn-outline-primary btn-sm mx-1 btn_view' to={`/viewenrolled/${enrolled.id}`}>
                        <FaEye className="view-icon" /> View
                      </Link>
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
    </div>
  );
}
