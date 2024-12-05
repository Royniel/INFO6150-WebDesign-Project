import React from 'react';
import './Navbar.css';
import logo from '../../assets/images/whiskers-logo.svg';
import { Link, useNavigate } from 'react-router-dom';

// Navbar component for site navigation
const Navbar = () => {
    const navigate = useNavigate();
    //user authentication
    const user = true;

    //user logout handling function
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    };

    return (
        <div className="main">
            <img className="logoImg" src={logo} alt="Logo" />
            <div className="links">
                <Link to="/home" className="link">Home</Link>
                <Link to="/upload-pet" className="link">Upload a Pet</Link>
                <Link to="/all-pets" className="link">
                    Pet Matching
                    </Link>
                {/* Conditional rendering based on user authentication status */}
                {user ? (
                <>
                    <Link to="/profile" className="link">Profile</Link>
                    <button onClick={handleLogout} className="link logout-button">Logout</button>
                </>
                ) : (
                <Link to="/" className="link">Login</Link>
                )}
                
            </div>
        </div>
    );
};

export default Navbar;
