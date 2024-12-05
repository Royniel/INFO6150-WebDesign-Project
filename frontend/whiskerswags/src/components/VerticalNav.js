import React from 'react';
import { Link } from 'react-router-dom';
import './VerticalNav.css';

// VerticalNav component for admin dashboard navigation
const VerticalNav = () => {
  return (
    <div className="vertical-nav">
      <div className="logo-container">
        {}
      </div>
      <Link to="/admin/home">Home</Link>
      <Link to="/admin/approvals">Approvals</Link>
      <Link to="/admin/users">Users</Link>
    </div>
  );
};

export default VerticalNav;