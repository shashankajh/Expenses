import React from 'react';
import './Navbar.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleNavLinkClick = () => {
    const collapseElement = document.getElementById('navbarNav');
    if (collapseElement) {
      const bsCollapse = new window.bootstrap.Collapse(collapseElement, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <div className='navi'> 
        <nav className="navbar navbar-expand-lg bg-secondary Navigation0">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="#">Zuci-University</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="container-fluid navbar-nav justify-content-center">
                <li className="nav-item">
                <NavLink className="nav-link nav-link-outline-secondary" aria-current="page" activeClassName="active" exact to="/homepage" onClick={handleNavLinkClick}>Home</NavLink>
                </li>
                <li className="nav-item"> 
                <NavLink className="nav-link" activeClassName="active" to="/sub" onClick={handleNavLinkClick}>Subjects</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/students" onClick={handleNavLinkClick}>Students</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/enroll" onClick={handleNavLinkClick}>Enroll</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/contact" onClick={handleNavLinkClick}>Contact</NavLink>
                </li>
            </ul>
            <div className="navbar-expand-md">
            <form className="d-flex justify-content-end " role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success text-muted" type="submit">Search</button>
            </form>
            </div>
            </div>
        </div>
        </nav>
    </div>
  )
}
