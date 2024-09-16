import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Addsubject(){

    let navigate = useNavigate()
    const [subject, setUsers] = useState({
        subject_code :"",
        subject_name :""
    })

    const {subject_code, subject_name} = subject

    const onInputChange =(e)=>{
        setUsers({...subject,[e.target.name]:e.target.value});
    };

    const onSubmit= async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/subject",subject)
        navigate("/sub")
    }

    return (
    <div className="container">
        <div className="row ">
            <div className="col-md-6 offset-md-3 border border-warning rounded p-4 mt-2 shadow">
                <h2 className="text-center reg_btn">Add Subjects</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-2 ">
                        <label htmlFor="Subject_Name" className="form-label ">Subject Name</label>
                            <input type={"text"} className="form-control" placeholder="Enter subject name here" name="subject_name" value={subject_name} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className="mb-4 ">
                        <label htmlFor="Subject_Code" className="form-label">Subject Code</label>
                            <input type={"text"} className="form-control" placeholder="Enter subject code here" name="subject_code" value={subject_code} onChange={(e)=>onInputChange(e)}/>
                    </div>
                <button type="submit" className="btn btn-sm btn-outline-secondary btn_addStudent">
                    submit
                </button>
                <Link className="btn btn-sm btn-outline-danger btn_addStudent mx-3" to={"/sub"}>
                    Cancel
                </Link>
                </form>
            </div>
        </div>
    </div>

    )
}