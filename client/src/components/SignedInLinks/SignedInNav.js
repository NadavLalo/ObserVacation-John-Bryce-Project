import React from 'react';
import { Link } from 'react-router-dom';

const SignedInNav = props => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <span className="navbar-text mr-2 text-light">
          Hello, {props.username}
        </span>
      </li>
      <li className="nav-item">
        <Link to="/">
          <button
            className="mt-1 btn btn-sm btn-secondary"
            onClick={() => props.logOut()}
          >
            Log Out
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default SignedInNav;
