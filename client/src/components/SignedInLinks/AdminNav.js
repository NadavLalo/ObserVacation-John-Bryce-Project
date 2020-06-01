import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <React.Fragment>
      <li className="nav-item">
        <NavLink to="/add" className="nav-link">
          Add Vacation
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/reports" className="nav-link">
          Reports
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default AdminNav;
