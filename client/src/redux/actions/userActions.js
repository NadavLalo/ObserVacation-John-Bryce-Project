import axios from 'axios';

export const signIn = user => dispatch => {
  axios.post('http://localhost:4000/signin', user).then(res => {
    switch (res.data.logtype) {
      case 'error':
        dispatch({ type: 'NO_ACCESS' });
        break;
      case 'admin':
        localStorage.setItem('JWT', res.data.accessToken);
        dispatch({
          type: 'ADMIN',
          payload: res.data
        });
        break;
      case 'user':
        localStorage.setItem('JWT', res.data.accessToken);
        dispatch({
          type: 'LOGIN',
          payload: res.data
        });
        break;
      default:
        break;
    }
  });
};

export const signUp = user => dispatch => {
  axios.post('http://localhost:4000/signup', user).then(res => {
    if (res.data === 'error') {
      dispatch({ type: 'USERNAME_EXISTS' });
    } else {
      localStorage.setItem('JWT', res.data.accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          username: res.data.username,
          user_id: res.data.user_id,
          accessToken: res.data.accessToken
        }
      });
    }
  });
};
export const verifyToken = jwt => dispatch => {
  axios
    .post('http://localhost:4000/auth', null, {
      headers: { token: jwt.token }
    })
    .then(res => {
      switch (res.data.logtype) {
        case 'error':
          dispatch({ type: 'NO_ACCESS' });
          break;
        case 'unauthorized': {
          localStorage.removeItem('JWT');
          dispatch({ type: 'UNAUTHORIZED' });
          break;
        }
        case 'admin':
          dispatch({
            type: 'ADMIN',
            payload: res.data
          });
          break;
        case 'user':
          dispatch({
            type: 'LOGIN',
            payload: res.data
          });
          break;
        default:
          return null;
      }
    });
};

export const logOut = () => dispatch => {
  localStorage.clear();
  dispatch({ type: 'LOG_OUT', payload: {} });
};
