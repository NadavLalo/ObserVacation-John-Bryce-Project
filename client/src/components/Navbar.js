import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInNav from './SignedInLinks/SignedInNav';
import AdminNav from './SignedInLinks/AdminNav';
import { connect } from 'react-redux';
import { logOut } from '../redux/actions/userActions';

class Navbar extends Component {
  constructor() {
    super();
    this.state = { isLogged: null, isAdmin: null };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.isLogged === !prevProps.user.isLogged) {
      this.setState({ isLogged: true });
    }
  }
  render() {
    const home = this.state.isLogged ? '/vacations' : '/';
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={home} id="brand" className="navbar-brand">
              ObserVacation
            </Link>
          </li>

          {this.props.user.isAdmin ? <AdminNav /> : null}
        </ul>

        {this.props.user.isLogged ? (
          <SignedInNav
            username={this.props.user.username}
            logOut={this.props.logOut}
          />
        ) : null}
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
