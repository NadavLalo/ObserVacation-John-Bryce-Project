import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { fetchVacations } from '../redux/actions/vacationActions';
import { verifyToken } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
class Reports extends Component {
  componentDidMount() {
    if (!this.props.user.isAdmin) {
      if (localStorage.hasOwnProperty('JWT')) {
        const token = localStorage.getItem('JWT');
        this.props.verifyToken({ token });
      } else {
        this.props.history.push('/');
      }
    } else {
      const { user_id, token } = this.props.user;
      this.props.fetchVacations(user_id, token);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.isAdmin !== prevProps.user.isAdmin) {
      const { user_id, token } = this.props.user;
      this.props.fetchVacations(user_id, token);
    }
    if (!this.props.user.isAdmin) {
      this.props.history.push('/vacations');
    }
    if (this.props.user.unauthorized) {
      this.props.history.push('/');
    }
  }
  render() {
    const followedVacations = this.props.vacations.filter(
      vac => vac.followers > 0
    );
    const destinations = followedVacations.map(vac => vac.destination);
    const followers = followedVacations.map(vac => vac.followers);

    const reportsDisplay =
      followedVacations.length > 0 ? (
        <div className="chart container mt-4 border">
          <h1 className="text-center">Vacations Followed</h1>
          <Bar
            data={{
              labels: destinations,
              datasets: [
                {
                  label: 'Followers',
                  backgroundColor: 'rgb(15, 66, 115)',
                  borderColor: 'rgb(0, 0, 0)',
                  data: followers
                }
              ]
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1
                    }
                  }
                ]
              }
            }}
            // options={{ maintainAspectRatio: false }}
          />
          <div className="text-center mb-2">
            <Link to="/vacations">
              <button className="btn btn-dark ml-2">Home</button>
            </Link>
          </div>
        </div>
      ) : (
        <h1 className="text-center mt-2">
          No vacations are being followed yet
        </h1>
      );

    return reportsDisplay;
  }
}
const mapStateToProps = state => ({
  vacations: state.vacations.all,
  user: state.user
});
export default connect(
  mapStateToProps,
  { fetchVacations, verifyToken }
)(Reports);
