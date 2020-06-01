import axios from 'axios';

export const fetchVacations = (user_id, token) => dispatch => {
  axios
    .get('http://localhost:4000/vacations?user_id=' + user_id, {
      headers: { token }
    })
    .then(res =>
      dispatch({
        type: 'FETCH_VACATIONS',
        payload: res.data
      })
    )
    .catch(error => {
      console.log(error);
    });
};

export const fetchSingleVacation = (id, token) => dispatch => {
  axios
    .get(`http://localhost:4000/vacations/${id}`, { headers: { token } })
    .then(res => dispatch({ type: 'FETCH_SINGLE', payload: res.data }));
};

export const addNewVacation = (values, token) => dispatch => {
  axios
    .post('http://localhost:4000/vacations', values, { headers: { token } })
    .then(response =>
      dispatch({ type: 'ADD_VACATION', payload: response.data })
    );
};

export const editVacation = (values, id, token) => dispatch => {
  axios
    .put(`http://localhost:4000/vacations/${id}`, values, {
      headers: { token }
    })
    .then(res => dispatch({ type: 'EDIT_VACATION', payload: res.data }));
};

export const deleteVacation = (vacation_id, token) => dispatch => {
  axios
    .delete(`http://localhost:4000/vacations/${vacation_id}`, {
      headers: { token }
    })
    .then(res =>
      res.data === 'success'
        ? dispatch({ type: 'DELETE_VACATION', payload: vacation_id })
        : null
    );
};

export const followVacation = (vacation_id, user_id, token) => dispatch => {
  axios
    .post(
      `http://localhost:4000/followers`,
      { vacation_id, user_id },
      { headers: { token } }
    )
    .then(
      dispatch({ type: 'FOLLOW_VACATION', payload: { vacation_id, user_id } })
    );
};

export const unfollowVacation = (vacation_id, user_id, token) => dispatch => {
  axios
    .delete(
      `http://localhost:4000/followers?vacation_id=${vacation_id}&user_id=${user_id}`,
      { headers: { token } }
    )
    .then(dispatch({ type: 'UNFOLLOW_VACATION', payload: vacation_id }));
};
