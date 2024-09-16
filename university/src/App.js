
import './App.css';
import Navbar from './NavBar/Navbar.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './Pages/Homepage.js';
import Students from './Student/students.js';
import Sub from './Subjects/sub.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StudentDialog from './Student/addredit.js';
import ViewStudent from './Student/viewStudent.js';
import Addsubject from './Subjects/addSubject.js';
import Enrolls from './Enroll/enroll.js';
import ViewEnrolled from './Enroll/viewenrolled.js';
import ContactUs from './Contact/contact.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/homepage" element = {<Home/>}/>
          <Route exact path="/sub" element = {<Sub/>}/>
          <Route exact path="/students" element = {<Students/>}/>
          <Route exact path="/addredit" element = {<StudentDialog/>}/>
          <Route exact path="/viewstudents/:id" element = {<ViewStudent/>}/>
          <Route exact path="/addsubject" element = {<Addsubject/>}/>
          <Route exact path="/enroll" element = {<Enrolls/>}/>
          <Route exact path="/viewenrolled/:id" element = {<ViewEnrolled/>}/>
          <Route exact path="/contact" element = {<ContactUs/>}/>
        </Routes>
      </Router>

    </div>
  );
}
//<Sub/>
export default App;
