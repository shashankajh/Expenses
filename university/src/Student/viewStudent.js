import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewStudent() {
    const [student, setStudent] = useState({
        student_fname: "",
        student_lname: "",
        gender: "",
        email: "",
        usn: "",
        branch: "",
        batch: "",
        semester: "",
        subjects: [], // Initialize as an empty array
        enrolledSubject: "" // To hold the enrolled subject
    });

    const { id } = useParams();

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const studentResponse = await axios.get(`http://localhost:8080/student/${id}`);
            const subjectResponse = await axios.get(`http://localhost:8080/subject`);

            const studentData = studentResponse.data;
            const subjectsData = subjectResponse.data.content; // Extract content array

            console.log("Student Data:", studentData); // Debugging log
            console.log("Subjects Data:", subjectsData); // Debugging log

            setStudent({
                ...studentData,
                subjects: subjectsData
            });
        } catch (error) {
            console.error("Error loading student data:", error);
        }
    };

    const navigate = useNavigate();

    const handleSubjectSelect = async (event) => {
        const selectedSubjectIndex = event.target.value;
        const selectedSubject = student.subjects[selectedSubjectIndex];

        const isConfirmed = window.confirm(`Are you sure you want to enroll for ${selectedSubject.subject_name}?`);

        if (isConfirmed) {
            enrollStudent(selectedSubject);
        } else {
            // Handle cancellation
            navigate("/students");
        }
    };

    const enrollStudent = async (selectedSubject) => {
        try {
            const { subject_name, subject_code } = selectedSubject;

            const enrollmentResponse = await axios.post(`http://localhost:8080/enrolled`, {
                student_fname: student.student_fname,
                student_lname: student.student_lname,
                gender: student.gender,
                email: student.email,
                usn: student.usn,
                branch: student.branch,
                batch: student.batch,
                semester: student.semester,
                subject_name: subject_name,
                subject_code: subject_code
            });

            const enrolledSubjectData = enrollmentResponse.data;

            setStudent(prevState => ({
                ...prevState,
                enrolledSubject: enrolledSubjectData.subject_name
            }));
        } catch (error) {
            console.error("Error enrolling student:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center reg_btn mb-4">Details of Student</h2>

                    <div className="card mb-4">
                        <div className="card-header">
                            Details of Student id: <b>{id}</b>
                            <ul className="list-group list-group-flush my-2 shadow">
                                <li className="list-group-item">
                                    <b>First Name: </b>
                                    {student.student_fname}
                                </li>
                                <li className="list-group-item">
                                    <b>Last Name: </b>
                                    {student.student_lname}
                                </li>
                                <li className="list-group-item">
                                    <b>Gender: </b>
                                    {student.gender}
                                </li>
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {student.email}
                                </li>
                                <li className="list-group-item">
                                    <b>USN: </b>
                                    {student.usn}
                                </li>
                                <li className="list-group-item">
                                    <b>Branch: </b>
                                    {student.branch}
                                </li>
                                <li className="list-group-item">
                                    <b>Batch: </b>
                                    {student.batch}
                                </li>
                                <li className="list-group-item">
                                    <b>Semester: </b>
                                    {student.semester}
                                </li>
                                <li className="list-group-item">
                                    {student.enrolledSubject ? (
                                        <>
                                            <b>Enrolled Subject: </b>
                                            {student.enrolledSubject}
                                        </>
                                    ) : (
                                        <div className="card m-2">
                                            <div className="card-header">
                                                <div className="list-group list-group-flush mb-2 mt-2 my-2 shadow">
                                                    <div className="list-group m-2">
                                                        <b>
                                                            <span style={{ color: 'rgba(151, 9, 66, 0.852)' }}>Enroll for Subject </span>
                                                        </b>
                                                        {Array.isArray(student.subjects) && student.subjects.length > 0 ? (
                                                            <select className="form-select mt-2" onChange={handleSubjectSelect}>
                                                                <option value="">Select Subject</option>
                                                                {student.subjects.map((subject, index) => (
                                                                    <option key={index} value={index}>{subject.subject_name}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <p>No subjects available for enrollment.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-outline-success my-2" to={"/students"}>Back</Link>
                </div>
            </div>
        </div>
    );
}
