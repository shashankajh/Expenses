import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ContactUs() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request or some async operation
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the delay as needed
    }, []);

    const [contact, setUsers] = useState({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        message: ""
    });

    const onInputChange = (e) => {
        setUsers({ ...contact, [e.target.name]: e.target.value });
    };

    const { fullName, phoneNumber, emailAddress, message } = contact;
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/contact", contact);
        alert('Message sent successfully!');
        //navigate("/contact")// Navigate back to contact page
        window.location.reload(); // Force reload after navigation
    };

    return (
        <div>
            <section className="py-2 mt-2 bg-info" style={{ maxWidth: '90%', margin: '0 auto', border: '1px solid #002', borderRadius: '10px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 my-auto">
                            <h5>Contact Us</h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section mb-4">
                <div className="container mt-3">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Contact Form</h6>
                                    <hr />
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="form-group row mb-3">
                                            <label className="col-sm-4 col-form-label" htmlFor="fullName">Full Name</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="fullName" className="form-control" placeholder="Enter Full Name" name="fullName" value={fullName} onChange={(e) => onInputChange(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label className="col-sm-4 col-form-label" htmlFor="phoneNumber">Phone Number</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="phoneNumber" className="form-control" placeholder="Enter Phone Number" name="phoneNumber" value={phoneNumber} onChange={(e) => onInputChange(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label className="col-sm-4 col-form-label" htmlFor="emailAddress">Email Address</label>
                                            <div className="col-sm-8">
                                                <input type="email" id="emailAddress" className="form-control" placeholder="Enter Email Address" name="emailAddress" value={emailAddress} onChange={(e) => onInputChange(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-3">
                                            <label className="col-sm-4 col-form-label" htmlFor="message">Message</label>
                                            <div className="col-sm-8">
                                                <textarea id="message" rows="3" className="form-control" placeholder="Type your message..." name="message" value={message} onChange={(e) => onInputChange(e)}></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group py-3">
                                            <button type="submit" className="btn btn-primary shadow w-100">Send Message</button>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-md-6 border-start">
                                    <h4 className="main-heading mb-3">Address Information</h4>
                                    <img
                                        src="https://zucitech.com/wp-content/uploads/2020/09/Website-logo.png"
                                        alt="Zucitech Logo"
                                        style={{ maxWidth: '70%', height: 'auto' }}
                                    />
                                    <div className="underline">
                                        <p>
                                            Address : 2nd Floor, Potential House, 35/B,
                                            1st Main Rd, 3rd Phase, J. P. Nagar, Bengaluru,
                                            Karnataka 560078
                                        </p>
                                        <p>
                                            Hours:
                                            Closes: 6:00 pm ⋅ Opens: 9:30 am
                                        </p>
                                        <p>
                                            Phone: 086606 93249
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
