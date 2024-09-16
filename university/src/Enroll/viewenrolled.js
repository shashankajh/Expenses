import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewEnrolled() {
    const [enrolledsub, setEnrolled] = useState({
        student_fname: "",
        student_lname: "",
        gender: "",
        email: "",
        usn: "",
        branch: "",
        batch: "",
        semester: "",
        subject_code: "",
        esubject_name: "" // To hold the enrolled subject
    });

    const {id} = useParams()
  
    useEffect(() =>{
        loadEnrolledStudent();
    },[]); //[] - run once only when the page loaded
  
    // To get the perticular student info from backend
    const loadEnrolledStudent = async ()=>{
        const result = await axios.get(`http://localhost:8080/enrolled/${id}`)
        setEnrolled(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center reg_btn mb-4">Details of Enrolled Student</h2>
                
                    <div className="card mb-4">
                        <div className="card-header">
                            Details of Enrolled Student id: <b>{id}</b>
                            <ul className="list-group list-group-flush my-2 shadow">
                                <li className="list-group-item">
                                    <b>First Name: </b>
                                    {enrolledsub.student_fname}
                                </li>
                                <li className="list-group-item">
                                    <b>Last Name: </b>
                                    {enrolledsub.student_lname}
                                </li>
                                <li className="list-group-item">
                                    <b>Gender: </b>
                                    {enrolledsub.gender}
                                </li>
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {enrolledsub.email}
                                </li>
                                <li className="list-group-item">
                                    <b>USN: </b>
                                    {enrolledsub.usn}
                                </li>
                                <li className="list-group-item">
                                    <b>Branch: </b>
                                    {enrolledsub.branch}
                                </li>
                                <li className="list-group-item">
                                    <b>Batch: </b>
                                    {enrolledsub.batch}
                                </li>
                                <li className="list-group-item">
                                    <b>Semester: </b>
                                    {enrolledsub.semester}
                                </li>

                                <li className="list-group-item">
                                    <b>Subject Code: </b>
                                    {enrolledsub.subject_code}
                                </li>
                                <li className="list-group-item">
                                    <b>Subject Name: </b>
                                    {enrolledsub.subject_name}
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <Link className="btn btn-outline-success my-2" to={"/enroll"}>Back</Link>
                </div>
            </div>
        </div>
    );
    
    
}
