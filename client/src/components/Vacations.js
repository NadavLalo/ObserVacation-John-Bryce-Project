import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchVacations,
  deleteVacation
} from '../redux/actions/vacationActions';

import { verifyToken } from '../redux/actions/userActions';
import AdminButtons from './buttons/AdminButtons';
import UserButtons from './buttons/UserButtons';
import { Modal } from 'react-bootstrap';
import './Vacations.css';
class Vacations extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  componentDidMount() {
    if (!this.props.user.isLogged) {
      if (localStorage.hasOwnProperty('JWT')) {
        const token = localStorage.getItem('JWT');
        this.props.verifyToken({ token });
      } else {
        this.props.history.push('/');
      }
    } else {
      const { user_id, token } = this.props.user;
      if (this.props.vacations.length === 0) {
        this.props.fetchVacations(user_id, token);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.isLogged !== prevProps.user.isLogged) {
      const { user_id, token } = this.props.user;
      if (this.props.vacations.length === 0) {
        this.props.fetchVacations(user_id, token);
      }
    }
    if (this.props.user.unauthorized) {
      this.props.history.push('/');
    }
  }
  getEditPage = id => {
    this.props.history.push(`/edit/${id}`);
  };

  handleShow = idToDelete => {
    this.setState({ show: true, idToDelete });
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  fixDateDisplay(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const fixedDateInput = [day, month, year].join('/');
    return fixedDateInput;
  }
  render() {
    const vacationDisplay = (
      <div className="container-fluid mt-4 ">
        <div className="row">
          {this.props.vacations.map(vacation => {
            return (
              <div
                key={vacation.vacation_id}
                className="col-xl-4 col-lg-6 text-center"
              >
                <div className="card mx-4 my-4">
                  <h1 className="card-title mt-4">
                    {this.props.user.isAdmin ? (
                      <AdminButtons
                        getEditPage={this.getEditPage}
                        handleShow={this.handleShow}
                        vacation_id={vacation.vacation_id}
                      />
                    ) : (
                      <UserButtons
                        user_id={this.props.user.user_id}
                        vacation_id={vacation.vacation_id}
                        token={this.props.user.token}
                      />
                    )}
                  </h1>
                  <h4 className="mb-4 title"> {vacation.destination}</h4>
                  <hr />
                  <div className="card-body">
                    <p className="card-text description">
                      {vacation.description}
                    </p>
                    <hr />
                    <p className="card-text">Price: {vacation.price}</p>
                    <hr />
                    <img
                      src={`http://localhost:4000${vacation.img}`}
                      className="card-img-top"
                      alt={vacation.destination}
                    />
                    <hr />
                    <p className="card-text">
                      {this.fixDateDisplay(vacation.start_date)} -{' '}
                      {this.fixDateDisplay(vacation.end_date)}
                    </p>
                    <hr />
                    <p>
                      Followers:
                      <span className="btn btn-primary border">
                        {vacation.followers}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div>
        {vacationDisplay}
        <React.Fragment>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title className="alert alert-danger text-center">
                Are you sure you want to delete this vacation?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <div className="mx-auto">
                <button
                  className="btn btn-danger mr-1"
                  onClick={() => {
                    this.props.deleteVacation(
                      this.state.idToDelete,
                      this.props.user.token
                    );
                    this.setState({ show: false });
                  }}
                >
                  Confirm
                </button>
                <button className="btn btn-dark" onClick={this.handleClose}>
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vacations: state.vacations.all,
  vacationsUserFollows: state.vacations.vacationsUserFollows,
  allVacationsFollowed: state.vacations.allVacationsFollowed,
  user: state.user
});
export default connect(
  mapStateToProps,
  { fetchVacations, deleteVacation, verifyToken }
)(Vacations);
