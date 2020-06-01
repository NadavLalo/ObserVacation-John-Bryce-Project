import React from 'react';
import { connect } from 'react-redux';
import { followVacation } from '../../redux/actions/vacationActions';
import { unfollowVacation } from '../../redux/actions/vacationActions';
const UserButtons = props => {
  const followBtn =
    props.vacationsUserFollows &&
    props.vacationsUserFollows.find(
      vac => vac.vacation_id === props.vacation_id
    ) ? (
      <button
        className="btn btn-primary btn btn-primary float-right mr-4"
        onClick={() => {
          props.unfollowVacation(props.vacation_id, props.user_id, props.token);
        }}
      >
        Unfollow
      </button>
    ) : (
      <button
        className="btn btn-secondary btn btn-primary float-right mr-4"
        onClick={() => {
          props.followVacation(props.vacation_id, props.user_id, props.token);
        }}
      >
        Follow
      </button>
    );
  return followBtn;
};

const mapStateToProps = state => ({
  vacationsUserFollows: state.vacations.vacationsUserFollows
});
export default connect(
  mapStateToProps,
  { followVacation, unfollowVacation }
)(UserButtons);
